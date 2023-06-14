import React, { useState, useRef, useEffect } from "react";
import perfil from '../../assets/Vector1.png'
import edit from '../../assets/edit.png'
import { useDispatch } from "react-redux";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  const [view, setView] = useState("perfil");

  const [enabled, setEnabled] = useState(false);

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

  const perfilVistaRef = useRef(null);
  const comprasVistaRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { userData } = useSelector((state) => state);

  console.log(userData);

  const handleRating = (event) => {
    const selectedRating = parseInt(event.target.getAttribute("target"));
    console.log(selectedRating);
    setRating(selectedRating);
    if (selectedRating === rating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
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

  function validate(form) {
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
  }

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
  function handleProfileSubmit(event) {
    event.preventDefault();

    let user = {
      mail: form.mail || user.mail,
      password: form.password || user.password,
      first_name: form.nombre || user.nombre,
      last_name: form.apellido || user.apellido,
      address: form.address || user.address,
      image: profileImage || user.image,
    };

    dispatch();

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
  }

  return (
    <div className="text-black w-full flex justify-center relative h-screen bg-slate-300">
      <h2 className="absolute top-8 text-lg font-mono mx-auto w-fit">{"Hola" + " " + userData.name + "!"}</h2>
      <section className="w-fit mt-28 flex flex-col">
        <div className="w-fit flex flex-col mr-5 mx-auto">
          <h1 className="text-xl text-left font-bold mb-5 w-full">Configuraciones</h1>
          <div id="perfil" value="perfil" onClick={handleView} className="w-full hover:font-bold transition-all p-2 hover:bg-sky-300">
            <p>Mi Cuenta</p>
          </div>
          <div id="compras" value="compras" onClick={handleView} className="w-full hover:font-bold transition-all p-2 hover:bg-sky-300">
            <p>Compras</p>
          </div>
        </div>
      </section>
      <article className="w-fit">
        {isPerfilView && (
          <section className="bg-white w-fit m-auto mt-20 shadow-lg rounded-lg px-10 py-16" id="perfilVista" ref={perfilVistaRef}>
            <form onSubmit={handleProfileSubmit}>
              <div className="flex mb-4 w-10/12 mx-auto justify-between">
                <div className="flex w-fit">
                  <div className="bg-slate-600 w-fit rounded-full p-6 mr-8">
                    <img src={perfil} alt="vector" className="w-6 h-6"/>
                  </div>
                  <ul className="flex flex-row items-center gap-2">
                    <li  className='relative z-10 p-2 bg-sky-500 rounded-full'>
                        <img onClick={handleEdit} className=' h-3.5  w-3.5' src={edit} alt="" />
                    </li>
                    <li>
                      <button type='reset' className="p-1.5 border-bluey rounded-full"> 
                          <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                              <path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                          </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                  <label className={`absolute left-8  ${errors.first_name && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'} transition-all ${enabled === false ? ' translate-y-6 translate-x-0' : ' translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit'}`}>Nombre</label>
                  <input
                      className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.first_name  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? ' border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Nombre"
                  />
                  {errors.nombre &&
                      <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.first_name}</p>
                  }
                </div>
                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                  <label className={`absolute left-8  ${errors.last_name && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'} transition-all ${enabled === false ? ' translate-y-6 translate-x-0' : ' translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit'}`}>Apellido</label>
                  <input
                      className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.last_name  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? 'border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Apellido"
                  />
                  {errors.nombre &&
                      <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.last_name}</p>
                  }
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                  <label className={`absolute left-8  ${errors.mail && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'} transition-all ${enabled === false ? ' translate-y-6 translate-x-0' : ' translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit'}`}>Email</label>
                  <input
                      className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.mail  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? 'border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                      type="text"
                      name="mail"
                      value={form.mail}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Email"
                  />
                  {errors.nombre &&
                      <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.mail}</p>
                  }
                </div>
                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                  <label className={`absolute left-8  ${errors.address && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'} transition-all ${enabled === false ? ' translate-y-6 translate-x-0' : ' translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit'}`}>Direccion</label>
                  <input
                      className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.address  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? 'border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Direccion"
                  />
                  {errors.nombre &&
                      <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.address}</p>
                  }
                </div>
                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                  <label className={`absolute left-8  ${errors.password && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'} transition-all ${enabled === false ? ' translate-y-6 translate-x-0' : ' translate-x-0 translate-y-0 bg-white w-16 z-10 h-fit'}`}>Contraseña</label>
                  <input
                      className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.password  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? 'border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      disabled={!enabled}
                      placeholder="Contraseña"
                  />
                  {errors.nombre &&
                      <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.password}</p>
                  }
                </div>
              </div>
              {enabled && 
                  <div className='flex mb-5 mx-auto flex-col justify-center w-full md:w-fit relative'>
                    <label className={`absolute left-8  ${errors.image && enabled === true ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400 bg-white w-16 z-10 h-fit'} transition-all `}>URL</label>
                    <input
                        className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-14 text-grey ${errors.image  && enabled === true ? 'border-red-500  focus:border-red-500' : 'border-grey '}${enabled === false ? 'border-transparent translate-y-0 translate-x-20' : 'borde translate-x-0 translate-y-0 focus:border-cyan-500 hover:border-cyan-500'}`} 
                        type="text"
                        id="profileImage"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        disabled={!enabled}
                        placeholder="Imagen de perfil"
                    />
                    {errors.nombre &&
                        <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.image}</p>
                    }
                  </div>
                }
              <button disabled={!enabled} className='bg-cyan-400 mt-5 hover:shadow-xl hover:font-bold transition-all' type="submit">Confirmar cambios</button>
            </form>
          </section>
        )}
        {isComprasView && (
          <section id="comprasVista" ref={comprasVistaRef}>
            <h2>Formulario de Puntuación y Reseña</h2>
            ALGO.map
            {
              <form>
                <div>
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                  />

                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`fa fa-heart ${
                        value <= rating ? "checked" : ""
                      }`}
                      onClick={handleRating}
                      target={value}
                      style={{ color: value <= rating ? "red" : "" }}
                    ></span>
                  ))}
                </div>
                <div className="review">
                  <textarea
                    name="review"
                    value={review}
                    placeholder="Escribe tu reseña aquí"
                    onChange={handleReviewChange}
                  ></textarea>
                </div>
                <input type="submit" value="Enviar" />
              </form>
            }
          </section>
        )}
      </article>
    </div>
  );
}
