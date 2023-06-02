import userL from "../../assets/user.svg";
import styles from "../Profile/Profile.module.css";

import { useState } from "react";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Profile() {
  const [inputs, setInputs] = useState({
    name: "Amadeo Euralto",
    lastName: "Amadeo Euralto",
    email: "amadeo@gmail.com",
    password: "amadeo123",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [activateInputs, setActivateInputs] = useState(false);

  function validate(inputs) {
    const errors = {};
    if (!inputs.email) {
      errors.email = "Debe haber un email";
    } else if (!inputs.password) {
      errors.password = "Debe haber un password";
    } else if (!inputs.name) {
      errors.name = "Debe haber un nombre";
    } else if (!inputs.lastName) {
      errors.lastName = "Debe haber un apellido";
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

    if (Object.keys(errors).length === 0) {
      setInputs({
        name: "",
        lastName: "",
        email: "",
        password: "",
      });
      setErrors({
        name: "",
        lastName: "",
        email: "",
        password: "",
      });
      alert("Cambios guardados!");
      setActivateInputs(false);
    }
  }

  function toogleInputs() {
    setActivateInputs(true);
  }
  return (
    <section className={styles.container}>
      <article className="m-5 p-3 flex flex-col lg:flex-row items-center justify-center gap-4 xl:w-3/4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-black capitalize font-bold text-xl">settings</h2>

          <button className="flex items-center gap-1.5 text-grey capitalize">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            account
          </button>

          <button className="flex items-center gap-1.5 text-grey capitalize">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M16 16V8M12 16v-5M8 16v-3"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z"
                stroke="#000000"
                strokeWidth="1.5"
              ></path>
            </svg>
            historial
          </button>
          <button className="flex items-center gap-1.5 text-grey capitalize">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M19.26 9.696l1.385 9A2 2 0 0118.67 21H5.33a2 2 0 01-1.977-2.304l1.385-9A2 2 0 016.716 8h10.568a2 2 0 011.977 1.696zM14 5a2 2 0 10-4 0"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            products
          </button>
          <button className="flex items-center gap-1.5 text-grey capitalize">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M21 13V8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h7"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                clipRule="evenodd"
                d="M20.879 16.917c.494.304.463 1.043-.045 1.101l-2.567.291-1.151 2.312c-.228.459-.933.234-1.05-.334l-1.255-6.116c-.099-.48.333-.782.75-.525l5.318 3.271z"
                stroke="#000000"
                strokeWidth="1.5"
              ></path>
              <path
                d="M12 11.01l.01-.011M16 11.01l.01-.011M8 11.01l.01-.011"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            password
          </button>
        </div>

        <article className="m-2 p-6 flex flex-col items-center justify-center gap-11 bg-white shadow-lg rounded-md">
          <ul className="flex flex-row items-center justify-center gap-3">
            <li>
              <img className={styles.userImg} src={userL} alt="user logo" />
            </li>

            <li>
              <ul className="flex flex-row items-center gap-2">
                <li>
                  <button
                    className="p-1.5 bg-bluey rounded-full"
                    onClick={toogleInputs}
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
                        d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </li>

                {/* <li>
                  <button className="p-1.5 border-bluey rounded-full">
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
                </li> */}
              </ul>
            </li>
          </ul>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center justify-center"
          >
            <div className="flex flex-col justify-center md:w-full lg:w-min relative mb-6">
              <label className="absolute w-16 bg-white h-fit bottom-10 left-8 text-cyan-400">
                Name
              </label>

              {!activateInputs ? (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  disabled
                ></input>
              ) : (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-grey bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                ></input>
              )}
            </div>

            <p className="text-rose-500 relative bottom-6 md:bottom-8">
              {errors.name}
            </p>

            <div className="flex flex-col justify-center md:w-full lg:w-min relative mb-6">
              <label className="absolute w-20 bg-white h-fit bottom-10 left-8 text-cyan-400">
                Last name
              </label>

              {!activateInputs ? (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="text"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={handleChange}
                  disabled
                ></input>
              ) : (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-grey bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="text"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={handleChange}
                ></input>
              )}
            </div>

            <p className="text-rose-500 relative bottom-6 md:bottom-8">
              {errors.lastName}
            </p>

            <div className="flex flex-col justify-center md:w-full lg:w-min relative mb-6">
              <label className="absolute w-16 bg-white h-fit bottom-10 left-8 text-cyan-400">
                Email
              </label>

              {!activateInputs ? (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                  disabled
                ></input>
              ) : (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-grey bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                ></input>
              )}
            </div>

            <p className="text-rose-500 relative bottom-6 md:bottom-8">
              {errors.email}
            </p>

            <div className="flex flex-col justify-center md:w-full lg:w-min relative mb-6">
              <label className="absolute w-16 bg-white h-fit bottom-10 left-8 text-cyan-400">
                Password
              </label>

              {!activateInputs ? (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                ></input>
              ) : (
                <input
                  className="placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-grey bg-transparent rounded-md p-2 pl-10 text-grey"
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  placeholder="********"
                ></input>
              )}
            </div>

            <p className="text-rose-500 relative bottom-6 md:bottom-8">
              {errors.password}
            </p>

            {!activateInputs ? null : (
              <button className="px-16 bg-bluey capitalize md:w-full lg:w-min">
                guardar
              </button>
            )}
          </form>
        </article>
      </article>
    </section>
  );
}
