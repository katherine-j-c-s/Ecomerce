import { useState, useRef, useEffect } from "react";
import perfil from "../../assets/Vector1.png";
import edit from "../../assets/edit.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import {
  getProductById,
  getUserId,
  userUpDate,
  postComments,
  deleteUser,
  logOut,
} from "../../redux/actions";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userData);
  const { productDetail, commentsUser ,darkModeClient } = useSelector((st) => st);
  const orders = user.orders;

  const userLocal = JSON.parse(localStorage.getItem("userData"));

  const uniqueProductNames = new Set();
  const uniqueProductIds = new Set();

  const perfilVistaRef = useRef(null);
  const comprasVistaRef = useRef(null);

  const [view, setView] = useState("perfil");
  const [enabled, setEnabled] = useState(false);
  const [showForm, setShowform] = useState(false);

  const [rating, setRating] = useState({});
  const [review, setReview] = useState([]);
  const [images, setImages] = useState([]);
  const [send, setSend] = useState([]);
  const [commentCreated, setCommentCreated] = useState([])

  const [form, setForm] = useState({
    mail: userLocal.email || user.email,
    password: "********",
    first_name: userLocal.name || user.name,
    last_name: userLocal.lastName || user.lastName,
    address: userLocal.address || user.address,
    image: userLocal.image?.url || user.image?.url,
  });

  const [errors, setErrors] = useState({
    mail: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getUserId(userLocal.id));
  }, []);

  useEffect(() => {
    if (Object.keys(productDetail).length > 0) {
      let newlist = { id: productDetail.id, value: productDetail.image[0] };
      let repetido = images.find((i) => i.id === productDetail.id);
      if (!repetido) {
        images.push(newlist);
        let idComentarios = productDetail.comments.find(c => c.UserId === userLocal.id)
        if(idComentarios){commentCreated.push(idComentarios)}
        }
        
    }
  }, [productDetail]);

  orders?.forEach((order) => {
    order.products.forEach((product) => {
      uniqueProductNames.add(product.title);
      uniqueProductIds.add(product.id);
      let newlist = { id: product.id, value: "" };
      let repetido = review.find((c) => c.id === product.id);
      if (!repetido) {
        review.push(newlist);
        dispatch(getProductById(product.id));
      }
    });
  });

  const handleRating = (productId, value) => {
    setRating({
      ...rating,
      [productId]: value,
    });
  };

  const handleReviewChange = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    let newList = review.map((c) => {
      if (c.id === Number(id)) {
        let result = { id: c.id, value: value };
        return result;
      }
      return c;
    });
    setReview(newList);
  };

  const handleView = (event) => {
    const value = event.target.value;
    if (value === "perfil") {
      setView("perfil");
    } else if (value === "compras") {
      setView("compras");
    }
  };

  const isPerfilView = view === "perfil";
  const isComprasView = view === "compras";

  const handleEdit = (event) => {
    event.preventDefault();
    setEnabled(!enabled);
  };

  //Funcion para eliminar cuenta
  function handleDelete() {
    swal({
      title: "Eliminar cuenta",
      text: "¿Estás seguro de que deseas continuar?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(deleteUser(userLocal.id)).then((success) => {
          toast.success("Cuenta eliminada exitosamente.", {
            duration: 2000,
          });

          setTimeout(() => {
            toast.remove();
            dispatch(logOut());
            navigate("/");
          }, 2000);
        });
      }
    });
  }

  const validate = (form) => {
    const errors = {};
    if (!form.first_name) {
      errors.first_name = "Debe haber un nombre";
    } else if (form.first_name.length < 3) {
      errors.first_name = "el nombre debe tener al menos tres letras";
    } else if (!form.last_name) {
      errors.last_name = "Debe haber un apellido";
    } else if (form.last_name.length < 3) {
      errors.last_name = "el apellido debe tener al menos tres letras";
    } else if (!form.mail) {
      errors.mail = "Debe haber un email";
    } else if (!regexEmail.test(form.mail)) {
      errors.mail = "Debe ser un email válido";
    } else if (!form.password) {
      errors.password = "Debe haber un password";
    } else if (form.password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
    } else if (!form.address) {
      errors.address = "Debe haber una direccion";
    }
    return errors;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
    setErrors(
      validate({
        ...form,
        [name]: value,
      })
    );
  };
  const handleProfileSubmit = (event) => {
    event.preventDefault();

    const modifiedUser = {};

    if (form.mail !== userLocal.email) {
      modifiedUser.mail = form.mail;
    }

    if (form.password !== "********") {
      modifiedUser.password = form.password;
    }

    if (form.first_name !== userLocal.first_name) {
      modifiedUser.first_name = form.first_name;
    }

    if (form.last_name !== userLocal.lastName) {
      modifiedUser.last_name = form.last_name;
    }

    if (form.address !== userLocal.address) {
      modifiedUser.address = form.address;
    }

    if (form.image !== userLocal.imageLocal.url) {
      modifiedUser.image = form.image;
    }

    dispatch(userUpDate(userLocal.id, modifiedUser))
      .then(() => {
        if (!submit) {
          setSubmit(true);
          toast.success("Cambios guardados", {
            duration: 2000,
          });

          setTimeout(() => {
            toast.remove();
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Hubo un error");
      });

    if (Object.keys(errors).length === 0) {
      setForm({
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
      });
      setErrors({
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
      });
    }
  };

  const handleSubmitComments = (event) => {
    event.preventDefault();
    let resultado = [];

    review.forEach((element) => {
      const rate = rating[element.id];
      resultado.push({
        id: element.id,
        content: element.value,
        rate: rate,
        id_usuario: userLocal.id,
      });
    });

    let envio = resultado.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    send.push(parseInt(event.target.id));
    dispatch(postComments(envio));
    window.location.reload();
  };

  const handleAdmin = (event) => {
    event.preventDefault()
    navigate("/admin?pestaña=dashboard")
  }

  return (
    <main className={!darkModeClient ? '' : 'dark'}>
        <div className="dark:bg-slate-950 dark:text-slate-300 bg-slate-300 text-black w-full flex md:flex-row flex-col justify-center relative h-fit md:h-screen">
        <h2 className="absolute md:top-8 top-56 text-lg w-full font-bold mx-auto md:w-fit">
          {"Hola" + " " + user.name + "!"}
        </h2>
        <div>
          <Toaster />
        </div>
        <section className="md:w-fit w-full mx-auto md:mx-0 md:mt-28 mt-28 flex flex-col">
          <div className="w-fit md:px-0 flex flex-col md:mr-5 mx-auto">
            <h1 className="text-xl md:text-left font-bold mb-5 w-full">
              Configuraciones
            </h1>
            <div className="flex md:flex-col w-full justify-between">
              <div
                id="perfil"
                value="perfil"
                onClick={handleView}
                className="dark:hover:text-slate-900 md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
              >
                <button onClick={handleView} value="perfil">
                  Mi Cuenta
                </button>
              </div>
              {uniqueProductNames.size > 0
                  && <div
                id="compras"
                value="compras"
                className="dark:hover:text-slate-900 md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
              >
                <button onClick={handleView} value="compras">
                  Compras
                </button>
              </div>}
             {user.role === "admin" && <div
                id="Admin"
                value="Admin"
                className="dark:hover:text-slate-900 md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
              >
                 <button value="admin" onClick={handleAdmin}>Panel de Administrador</button>
              </div>}
            </div>
          </div>
        </section>
        <article className="md:w-fit w-full">
          {isPerfilView && (
            <section
              className="dark:bg-transparent dark:border dark:border-dashed dark:border-sky-300 bg-white md:w-fit w-10/12 m-auto mt-20 shadow-lg mb-20 rounded-lg md:px-10 py-8 md:py-16"
              id="perfilVista"
              ref={perfilVistaRef}
            >
              <form onSubmit={handleProfileSubmit}>
                <div className="flex md:mb-4 mb-10 w-10/12 mx-auto justify-between">
                  <div className="flex w-fit">
                    <div className="w-fit rounded-full p-6 mr-8 max-w-[120px]">
                      <img
                        src={userLocal.imageLocal?.url || perfil}
                        alt="vector"
                        className="w-14 h-14 rounded-full"
                      />
                    </div>
                    <ul className="flex flex-row items-center gap-2">
                      <li className="relative z-10 p-2 bg-sky-500 rounded-full">
                        <button
                          className="p-1 rounded-full"
                          onClick={handleEdit}
                        >
                          <img className=" h-3.5  w-3.5" src={edit} alt="" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="reset"
                          className="dark:bg-sky-300 border-bluey p-2.5  rounded-full"
                          onClick={handleDelete}
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#000000"
                          >
                            <path
                              d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex w-full md:flex-row flex-col justify-center">
                  <div className="flex mb-10 md:mb-5 flex-col justify-center w-10/12 mx-auto md:mx-0 md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.first_name && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 dark:bg-slate-950 bg-white"
                      } transition-all ${
                        enabled === false
                          ? " md:translate-y-6 translate-y-0 translate-x-0"
                          : " translate-x-0 translate-y-0 w-16 z-10 h-fit"
                      }
                      `}
                    >
                      Nombre
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
                        errors.first_name && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? " border-transparent translate-y-0 md:translate-x-14 translate-x-0"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Nombre"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                  <div className="flex mb-10 md:mb-5 flex-col justify-center w-10/12 mx-auto md:mx-0 md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.last_name && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 dark:bg-slate-950 bg-white"
                      } transition-all ${
                        enabled === false
                          ? " md:translate-y-6 translate-y-0 translate-x-0"
                          : " translate-x-0 translate-y-0  w-16 z-10 h-fit"
                      } 
                      `}
                    >
                      Apellido
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
                        errors.last_name && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? "border-transparent translate-y-0 md:translate-x-14 translate-x-0"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Apellido"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex w-full md:flex-row flex-col  justify-center">
                  <div className="flex mb-10 md:mb-5 flex-col justify-center w-10/12 mx-auto md:mx-0 md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.mail && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 dark:bg-slate-950 bg-white"
                      } transition-all ${
                        enabled === false
                          ? "md:translate-y-6 translate-y-0 translate-x-0"
                          : " translate-x-0 translate-y-0 w-16 z-10 h-fit"
                      } 
                      `}
                    >
                      Email
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
                        errors.mail && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? "border-transparent translate-y-0 md:translate-x-8 translate-x-0"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="text"
                      name="mail"
                      value={form.mail}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Email"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.mail}
                      </p>
                    )}
                  </div>
                  <div className="flex mb-10 md:mb-5 flex-col justify-center w-10/12 mx-auto md:mx-0 md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.address && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 dark:bg-slate-950 bg-white"
                      } transition-all ${
                        enabled === false
                          ? "md:translate-y-6 translate-y-0 translate-x-0"
                          : " translate-x-0 translate-y-0 w-16 z-10 h-fit"
                      } 
                      `}
                    >
                      Direccion
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
                        errors.address && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? "border-transparent translate-y-0 md:translate-x-14 translate-x-0"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Direccion"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="flex mb-10 md:mb-5 flex-col justify-center w-10/12 mx-auto md:mx-0 md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.password && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 dark:bg-slate-950 bg-white"
                      } transition-all ${
                        enabled === false
                          ? "md:translate-y-6 translate-y-0 translate-x-0"
                          : " translate-x-0 translate-y-0 w-16 z-10 h-fit"
                      } 
                      `}
                    >
                      Contraseña
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
                        errors.password && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? "border-transparent translate-y-0 md:translate-x-20 translate-x-0"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Contraseña"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                {enabled && (
                  <div className="flex mb-5 mx-aut10 flex-col justify-center w-10/12 mx-auto md:w-fit relative">
                    <label
                      className={`absolute left-8  ${
                        errors.image && enabled === true
                          ? "bottom-14 md:bottom-16 text-red-500"
                          : "bottom-10 text-cyan-400 w-16 z-10 h-fit dark:bg-slate-950 bg-white"
                      } transition-all `}
                    >
                      Image
                    </label>
                    <input
                      className={`placeholder-slate-400 focus:outline-none ${
                        enabled ? "hover:shadow-md" : null
                      } md:m-2 border bg-transparent rounded-md p-2 pl-14 text-grey ${
                        errors.image && enabled === true
                          ? "border-red-500  focus:border-red-500"
                          : "border-grey "
                      }${
                        enabled === false
                          ? "border-transparent translate-y-0 translate-x-14"
                          : "borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500"
                      }`}
                      type="text"
                      id="profileImage"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Imagen de perfil"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 relative bottom-0 md:bottom-2">
                        {errors.image}
                      </p>
                    )}
                  </div>
                )}

                {enabled ? (
                  <button
                    className="dark:text-slate-900 bg-cyan-400 mt-5 hover:shadow-xl hover:font-bold transition-all"
                    type="submit"
                  >
                    Confirmar cambios
                  </button>
                ) : null}
              </form>
            </section>
          )}
          {isComprasView && (
            <section
              className="flex flex-col"
              id="comprasVista"
              ref={comprasVistaRef}
            >
              <h2 className="mt-20 mb-10 font-bold text-lg border-b-4 border-sky-400 w-fit mx-auto">
                {showForm === true
                  ? "Formulario de Puntuación y Reseña"
                  : "Mis Compras"}
              </h2>
              <div className="flex md:flex-row flex-col">
                {uniqueProductNames.size > 0
                  ? Array.from(uniqueProductNames).map((productName, i) => {
                      let id = Array.from(uniqueProductIds)[i];
                      let img = images.find((i) => i.id === id);
                      let image = null
                      if (img.value.url !== undefined) {
                        image = img.value.url
                      }else{
                        image = img.value
                      }
                      let comentarioRepetido = commentCreated.find(c => c.ProductId === Array.from(uniqueProductIds)[i])
                      let coment = review.find(
                        (c) => c.id === Array.from(uniqueProductIds)[i]
                      );
                      return (
                        <div
                          className="md:mx-2 w-10/12 md:mb-0 mb-5 mx-auto bg-white dark:bg-transparent dark:border dark:border-sky-400 dark:border-dashed rounded-xl trnasition-all hover:shadow-xl py-10 px-14"
                          key={productName}
                        >
                          <div className="bg-white dark:bg-slate-950 relative z-20">
                            <img
                              className="w-52 mx-auto rounded-full h-52"
                              src={image}
                              alt="img"
                            />
                            <h2 className="mt-4 w-10/12  mx-auto font-bold">
                              {productName}
                            </h2>
                          </div>
                          {comentarioRepetido !== undefined && comentarioRepetido.ProductId === Array.from(uniqueProductIds)[i] ?
                            <div>
                              <div>
                                <link
                                  rel="stylesheet"
                                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                                />
                                <p>{comentarioRepetido.content}</p>
                              </div>
                              {[1, 2, 3, 4, 5].map((value) => {
                                {comentarioRepetido.rate}
                                return(
                                  <span
                                    key={value}
                                    className={`fa fa-heart`}
                                    style={{
                                      color:
                                        value <=
                                        comentarioRepetido.rate
                                          ? "red"
                                          : "",
                                      marginRight: 5,
                                    }}
                                  ></span>
                                )})}
                            </div>
                          : <form
                              className={`${
                                showForm === true
                                  ? " translate-x-0 translate-y-0 relative"
                                  : "absolute -translate-y-44 z-0"
                              } 
                      transition-all bg-white dark:bg-transparent`}
                            >
                              <div>
                                <link
                                  rel="stylesheet"
                                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                                />
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <span
                                    key={value}
                                    className={`fa fa-heart ${
                                      value <=
                                      rating[Array.from(uniqueProductIds)[i]]
                                        ? "checked"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleRating(
                                        Array.from(uniqueProductIds)[i],
                                        value
                                      )
                                    }
                                    style={{
                                      color:
                                        value <=
                                        rating[Array.from(uniqueProductIds)[i]]
                                          ? "red"
                                          : "",
                                      marginRight: 5,
                                    }}
                                  ></span>
                                ))}
                              </div>
                              <div className="">
                                <textarea
                                  className="py-2 px-4 dark:bg-transparent dark:border-b dark:border-sky-400 "
                                  name="review"
                                  value={coment.value}
                                  placeholder="Escribe tu reseña aquí"
                                  onChange={handleReviewChange}
                                  id={Array.from(uniqueProductIds)[i]}
                                ></textarea>
                              </div>
                              <button
                                className="bg-sky-400 hover:bg-sky-500 dark:text-slate-900 hover:shadow-lg"
                                onClick={handleSubmitComments}
                                id={Array.from(uniqueProductIds)[i]}
                              >
                                Enviar Comentario
                              </button>
                            </form> }
                        </div>
                      );
                    })
                  : "No Hay compras disponibles"}
              </div>
              {commentCreated.length < Array.from(uniqueProductNames).length ? <p
                onClick={() => {
                  if (showForm) {
                    setShowform(false);
                  } else {
                    setShowform(true);
                  }
                }}
                className="bg-sky-400 md:mt-10 mt-2 mb-10 cursor-pointer w-fit mx-auto p-2 rounded-xl font-mono hover:bg-sky-500 hover:shadow-lg"
              >
                {showForm === false ? "Dejar Reseña" : "volver"}
              </p> : null}
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
