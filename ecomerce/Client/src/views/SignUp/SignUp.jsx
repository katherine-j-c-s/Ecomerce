import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { signUp } from "../../redux/actions";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function SignUp() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    address: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    address: "",
  });

  // const [file, setFile] = useState();

  function validate(inputs) {
    const errors = {};
    if (!inputs.nombre) {
      errors.nombre = "Debe haber un nombre";
    } else if (inputs.nombre.length < 3) {
      errors.nombre = "el nombre debe tener al menos tres letras";
    } else if (!inputs.apellido) {
      errors.apellido = "Debe haber un apellido";
    } else if (inputs.apellido.length < 3) {
      errors.apellido = "el apellido debe tener al menos tres letras";
    } else if (!inputs.email) {
      errors.email = "Debe haber un email";
    } else if (!regexEmail.test(inputs.email)) {
      errors.email = "Debe ser un email válido";
    } else if (!inputs.password) {
      errors.password = "Debe haber un password";
    } else if (inputs.password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
    } else if (!inputs.address) {
      errors.address = "Debe haber una direccion";
    }
    return errors;
  }
  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }

  // function handleFileChange(e) {
  //   const fileToBack = e.target.files[0];

  //   if (fileToBack) {
  //     const url = URL.createObjectURL(fileToBack);

  //     setFile(url);
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();

    /*
    {
      "mail":"pablo@mail.com",
      "password":"1234",
      "first_name":"pablo",
      "last_name":"maldonado",
      "address":"hola2020",
      "image":"https://pbs.twimg.com/media/EkfMELxXEAEGCEP.jpg",
      "role":"client"
  }

  /sign up, /login, /logout
  */
    let newUser = {
      mail: inputs.email,
      password: inputs.password,
      first_name: inputs.nombre,
      last_name: inputs.apellido,
      address: inputs.address,
      image:
        inputs.image ||
        "https://publicdomainvectors.org/photos/abstract-user-flat-3.png",
      role: "client",
    };

    dispatch(signUp(newUser))
      .then((r) => {
        console.log(r);
        toast.success("Usuario creado con éxito!");

        setTimeout(() => {
          toast.remove();
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);

        err.message === "Network Error"
          ? toast.error("Ups, creo que hubo un error de servidor")
          : toast.error("Este usuario ya existe");
      });

    if (Object.keys(errors).length === 0) {
      setInputs({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });
      setErrors({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });
    }
  }
  return (
    <div className="flex justify-between text-white">
      <div className="bg-black w-full sm:w-2/5 h-screen lg:h-full">
        <Link to={"/"}>
          <p className="text-white relative top-4 left-10 w-fit">Go Back</p>
        </Link>
        <div className="mt-20">
          <h2 className="mb-16 font-bold text-3xl">Sign Up</h2>

          <div>
            <Toaster position="bottom-right" reverseOrder={false} />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-bluey hover:border-slate-400 hover:text-white hover:shadow transition duration-150"
              onClick={() =>
                (window.location.href =
                  "https://ecomerce-production-8f61.up.railway.app/users/google")
              }
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>

          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              nombre
            </label>
            <input
              className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-2 pl-10"
              name="nombre"
              value={inputs.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            ></input>

            <p className="text-rose-500">{errors.nombre}</p>

            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              apellido
            </label>

            <input
              className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-2 pl-10"
              name="apellido"
              value={inputs.apellido}
              onChange={handleChange}
              placeholder="Tu apellido"
            ></input>

            <p className="text-rose-500">{errors.apellido}</p>

            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              correo
            </label>

            <input
              className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-2 pl-10"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
            ></input>

            <p className="text-rose-500">{errors.email}</p>

            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              contraseña
            </label>

            <div>
              <input
                className="placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1 pl-10"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="********"
                type="password"
              ></input>
            </div>

            <p className="text-rose-500">{errors.password}</p>

            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              dirección
            </label>

            <input
              className="placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1 pl-10"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              placeholder="Tu dirección"
            ></input>

            <p className="text-rose-500">{errors.address}</p>

            <label className="relative right-24 top-2 bg-black text-cyan-400 capitalize">
              Foto de perfil
            </label>

            <input
              className="placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1 pl-10"
              name="image"
              value={inputs.image}
              onChange={handleChange}
            ></input>

            {/* <input
              type="file"
              className="placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            ></input> */}

            <button
              className="px-32 bg-cyan-400 py-3 my-6 text-slate-300"
              type="submit"
            >
              Iniciar
            </button>
          </form>
          <Link to={"/signIn"}>
            <p className="mb-10 text-cyan-500 underline font-thin text-sm">
              Ya tengo una cuenta
            </p>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex w-3/5 bg-gradient-to-r from-gray-600 to-sky-950">
        <div className="w-full flex align-middle justify-center">
          <div className="absolute top-40">
            <p className="text-9xl text-slate-500">“</p>
          </div>
          <div className="w-2/6 text-left mt-60 font-thin text-slate-300">
            <p>
              El deporte es la manifestación física de nuestros sueños, el
              reflejo de nuestra determinación y el combustible que enciende
              nuestra pasión.
            </p>
            <p className="mt-6">Wilma Rudolph.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
