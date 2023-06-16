import { useState, useRef, useEffect } from "react";
import perfil from "../../assets/Vector1.png";
import edit from "../../assets/edit.png";
import { useDispatch } from "react-redux";

import { getProductById, getUserId, userUpDate, postComments } from "../../redux/actions";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData);
  const { productDetail, commentsUser } = useSelector((st) => st);
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
  const [send, setSend] = useState([])

  const [form, setForm] = useState({
    mail: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    image: "",
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
    if (user) {
      setForm({
        mail: userLocal.email,
        password: "********",
        first_name: userLocal.name,
        last_name: userLocal.lastName,
        address: userLocal.address,
        image: userLocal.imageLocal.url,
      });
    }
  }, []);
  useEffect(() => {
    if (Object.keys(productDetail).length > 0) {
      let newlist = { id: productDetail.id, value: productDetail.image[0] };
      let repetido = images.find((i) => i.id === productDetail.id);
      if (!repetido) {
        images.push(newlist);
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

  console.log(rating)

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

  console.log(review)

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

    console.log(modifiedUser);

    dispatch(userUpDate(userLocal.id, modifiedUser));

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
  
  review.forEach(element => {
    const rate = rating[element.id];
    resultado.push({
      id: element.id,
      content: element.value,
      rate: rate,
      id_usuario: user.id
    });
  })
  
  let envio = resultado.find(producto => producto.id === parseInt(event.target.id))
  send.push(parseInt(event.target.id))
  dispatch(postComments(envio))
  console.log(commentsUser)
}


  return (
    <div className="text-black w-full flex md:flex-row flex-col justify-center relative h-fit md:h-screen bg-slate-300">
      <h2 className="absolute md:top-8 top-56 text-lg w-full font-mono mx-auto md:w-fit">
        {"Hola" + " " + user.name + "!"}
      </h2>
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
              className="md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
            >
              <button onClick={handleView} value="perfil">
                Mi Cuenta
              </button>
            </div>
            <div
              id="compras"
              value="compras"
              className="md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
            >
              <button onClick={handleView} value="compras">
                Compras
              </button>
            </div>
            <div
              id="Admin"
              value="Admin"
              className="md:w-full w-fit hover:font-bold transition-all p-2 hover:bg-sky-300"
            >
              <button value="admin">Panel de Administrador</button>
            </div>
          </div>
        </div>
      </section>
      <article className="md:w-fit w-full">
        {isPerfilView && (
          <section
            className="bg-white md:w-fit w-10/12 m-auto mt-20 shadow-lg mb-20 rounded-lg md:px-10 py-8 md:py-16"
            id="perfilVista"
            ref={perfilVistaRef}
          >
            <form onSubmit={handleProfileSubmit}>
              <div className="flex md:mb-4 mb-10 w-10/12 mx-auto justify-between">
                <div className="flex w-fit">
                  <div className="bg-slate-600 w-fit rounded-full p-6 mr-8">
                    <img src={perfil} alt="vector" className="w-6 h-6" />
                  </div>
                  <ul className="flex flex-row items-center gap-2">
                    <li className="relative z-10 p-2 bg-sky-500 rounded-full">
                      <img
                        onClick={handleEdit}
                        className=" h-3.5  w-3.5"
                        src={edit}
                        alt=""
                      />
                    </li>
                    <li>
                      <button
                        type="reset"
                        className="p-1.5 border-bluey rounded-full"
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
                        : "bottom-10 text-cyan-400"
                    } transition-all ${
                      enabled === false
                        ? " md:translate-y-6 translate-y-0 translate-x-0"
                        : " translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit"
                    }`}
                  >
                    Nombre
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
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
                        : "bottom-10 text-cyan-400"
                    } transition-all ${
                      enabled === false
                        ? " md:translate-y-6 translate-y-0 translate-x-0"
                        : " translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit"
                    }`}
                  >
                    Apellido
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
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
                        : "bottom-10 text-cyan-400"
                    } transition-all ${
                      enabled === false
                        ? "md:translate-y-6 translate-y-0 translate-x-0"
                        : " translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
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
                        : "bottom-10 text-cyan-400"
                    } transition-all ${
                      enabled === false
                        ? "md:translate-y-6 translate-y-0 translate-x-0"
                        : " translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit"
                    }`}
                  >
                    Direccion
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
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
                        : "bottom-10 text-cyan-400"
                    } transition-all ${
                      enabled === false
                        ? "md:translate-y-6 translate-y-0 translate-x-0"
                        : " translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit"
                    }`}
                  >
                    Contraseña
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${
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
                        : "bottom-10 text-cyan-400 bg-white w-16 z-10 h-fit"
                    } transition-all `}
                  >
                    Image
                  </label>
                  <input
                    className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-14 text-grey ${
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
              <button
                disabled={!enabled}
                className="bg-cyan-400 mt-5 hover:shadow-xl hover:font-bold transition-all"
                type="submit"
              >
                Confirmar cambios
              </button>
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
                    let coment = review.find(
                      (c) => c.id === Array.from(uniqueProductIds)[i]
                    );
                    return (
                      <div
                        className="md:mx-2 w-10/12 md:mb-0 mb-5 mx-auto bg-white rounded-xl trnasition-all hover:shadow-xl py-10 px-14"
                        key={productName}
                      >
                        <div className="bg-white relative z-20">
                          <img
                            className="w-52 mx-auto rounded-full h-52"
                            src={img.value}
                            alt="img"
                          />
                          <h2 className="mt-4 w-10/12 mx-auto font-mono">
                            {productName}
                          </h2>
                        </div>
                        {<form
                          className={`${
                            showForm === true
                              ? " translate-x-0 translate-y-0 relative"
                              : "absolute -translate-y-44 z-0"
                          } 
                    transition-all bg-white `}
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
                              className="py-2 px-4"
                              name="review"
                              value={coment.value}
                              placeholder="Escribe tu reseña aquí"
                              onChange={handleReviewChange}
                              id={Array.from(uniqueProductIds)[i]}
                            ></textarea>
                          </div>
                          <button className="bg-sky-400 hover:bg-sky-500 hover:shadow-lg" onClick={handleSubmitComments} id={Array.from(uniqueProductIds)[i]}>
                            Enviar Comentario
                          </button>
                        </form>}
                      </div>
                    );
                  })
                : "No Hay compras disponibles"}
            </div>
            <p
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
            </p>
          </section>
        )}
      </article>
    </div>
  );
}
