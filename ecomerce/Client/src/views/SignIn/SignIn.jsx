import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { signIn } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

/*
Datos para iniciar sesion
{
    "mail":"pablo@mail.com",
    "password":"1234"
}
*/

export default function SignIn() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  function validate(inputs) {
    const errors = {};
    if (!inputs.email) {
      errors.email = "Debe haber un email";
    } else if (!inputs.password) {
      errors.password = "Debe haber un password";
    } else if (!regexEmail.test(inputs.email)) {
      errors.email = "Debe ser un email válido";
    } else if (inputs.password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
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
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signIn({ mail: inputs.email, password: inputs.password }))
      .then((user) => {
        if (user.payload.status === "inactive") {
          swal({
            title: "Cuenta inactiva",
            text: "Por favor, crea una nueva cuenta.",
            icon: "error",
          }).then((confirm) => {
            if (confirm) {
              navigate("/signUp");
            }
          });
        } else {
          toast.success(`¡Bienvenidos ${user.payload.first_name}!`, {
            duration: 2000,
          });

          setTimeout(() => {
            toast.remove();
            navigate("/");
          }, 3000);
        }
      })
      .catch((err) => {
        err.message === "Network Error"
          ? toast.error("Ups, creo que hubo un error de servidor")
          : toast.error("Este usuario no existe");
      });

    if (Object.keys(errors).length === 0) {
      setInputs({
        email: "",
        password: "",
      });
      setErrors({
        email: "",
        password: "",
      });
    }
  }
  return (
    <div className="flex justify-between text-white">
      <div className="bg-black w-full sm:w-2/5 h-screen">
        <Link to={"/"}>
          <p className="text-white relative top-4 left-10 w-fit">Volver</p>
        </Link>

        <div className="mt-20">
          <h2 className="mb-16 font-bold text-3xl">Iniciar Sesión</h2>

          <div>
            <Toaster />
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
              <span>Iniciar con Google</span>
            </button>
          </div>

          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
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

            <input
              className="placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1 pl-10"
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="********"
            ></input>

            <p className="text-rose-500">{errors.password}</p>

            <button
              className="px-32 bg-cyan-400 py-3 my-6 text-black"
              type="submit"
            >
              Iniciar
            </button>
          </form>
          <Link to={"/signUp"}>
            <p className="text-cyan-500 underline mt-3 font-thin text-sm">
              Registrarse
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
              El deporte es el lenguaje universal que conecta mente, cuerpo y
              espíritu en la búsqueda de la excelencia
            </p>
            <p className="mt-6">Aristóteles.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
