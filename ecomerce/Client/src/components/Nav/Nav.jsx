import styles from "../Nav/Nav.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import homeLogo from "../../assets/Logo_Marca_Personal_Minimalista_Elegante_y_Organico_Blanco_y_Negro_1-removebg-preview.png";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  logOut,
  getUserId,
  showCart,
  addDarkModeClient,
} from "../../redux/actions";
import { Cart, LogOut } from "iconoir-react";
import swal from "sweetalert";

import lunaRellena from "../../assets/moon.png";
import luna from "../../assets/moon1.png";
import sol from "../../assets/sun.png";
import solRelleno from "../../assets/sun1.png";

export default function Nav() {
  const location = useLocation();
  const actualRoute = location.pathname;
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const { image } = useSelector((state) => state.userData);
  const { darkModeClient } = useSelector((st) => st);
  const userInfo = localStorage.getItem("userData");

  if (!userInfo) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        id: "",
        imageLocal: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        access: false,
      })
    );
  }

  const { imageLocal, access } = JSON.parse(userInfo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    if (userId) {
      dispatch(getUserId(userId)).then((user) => {
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
        }
      });
    }
  }, []);

  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  function signOut() {
    //Ahora se usa sweetalert para cerrar sesión
    swal({
      title: "Cerrar Sesión",
      text: "¿Estás seguro de que deseas continuar?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        dispatch(logOut());
        navigate("/");
      } else {
        // Lógica a ejecutar si se cancela la confirmación
        // ...
      }
    });
  }
  const darkMode = () => {
    if (!darkModeClient) {
      dispatch(addDarkModeClient(true));
    } else {
      dispatch(addDarkModeClient(false));
    }
  };
  return (
    <nav
      className={`${
        darkModeClient === true ? " bg-slate-900 relative" : "bg-transparent"
      } transition-all  z-30`}
    >
      <div className="hidden md:block">
        <ul
          className={
            actualRoute === "/"
              ? "flex flex-wrap items-center justify-between p-4"
              : "flex flex-wrap items-center justify-between p-4 shadow"
          }
        >
          <li>
            <article className="flex items-center justify-center p-3 gap-5">
              <Link className="relative md:w-20 w-10" to="/">
                <img
                  src={homeLogo}
                  alt="home route image"
                  className={`${
                    darkModeClient === true
                      ? "bg-slate-100 rounded-full md:h-14 md:w-14 -top-7"
                      : "bg-transparent md:h-20 md:w-20 -top-8"
                  } transition-all h-10 w-10 absolute md:left-0 -left-10 `}
                />
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/alls"
              >
                Productos
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/about"
              >
                Nosotros
              </Link>
            </article>
          </li>

          <li>
            <article className="flex items-center jusfify-center gap-2">
              {access ? (
                <>
                  <div className="w-full flex justify-center">
                    <div
                      className={`${
                        darkModeClient === true ? "bg-sky-700" : "bg-slate-400"
                      } flex relative p-2 w-20 justify-between rounded-full`}
                    >
                      <div
                        onClick={darkMode}
                        className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                      >
                        <img
                          className={`h-4 w-4 absolute top-1`}
                          src={luna}
                          alt="vector"
                        />
                        <img
                          className={`${
                            darkModeClient === true ? "block" : "hidden"
                          } h-4 w-4 absolute top-1`}
                          src={lunaRellena}
                          alt="vector"
                        />
                      </div>
                      <div
                        className={`${
                          darkModeClient === true
                            ? "bg-sky-200 translate-x-0"
                            : "bg-gray-100 translate-x-10"
                        } z-0 transition-all h-6 w-6 absolute rounded-full p-1`}
                      ></div>
                      <div
                        onClick={darkMode}
                        className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                      >
                        <img
                          className={`h-4 w-4 absolute top-1`}
                          src={sol}
                          alt="vector"
                        />
                        {darkModeClient === false ? (
                          <img
                            className="h-4 w-4 absolute top-1"
                            src={solRelleno}
                            alt="vector"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <button
                    className="transition bg-sky-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                    onClick={() => dispatch(showCart())}
                  >
                    <Cart color={actualRoute === "/" ? "#FFFFFF" : "#000000"} />
                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                  >
                    <img
                      src={image?.url || image || imageLocal?.url || imageLocal}
                      alt="profile picture logo"
                      className={styles.userProfile}
                    />
                  </button>

                  <button
                    onClick={signOut}
                    className={
                      darkModeClient === false
                        ? "flex items-center gap-2 text-slate-800 dark:text-sky-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                        : "flex items-center gap-2 text-sky-200 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                    }
                  >
                    <LogOut
                      color={darkModeClient === false ? "#000000" : "#FFFFFF"}
                    />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <div className="w-full flex justify-center">
                    <div
                      className={`${
                        darkModeClient === true ? "bg-sky-700" : "bg-slate-400"
                      } flex relative p-2 w-20 justify-between rounded-full`}
                    >
                      <div
                        onClick={darkMode}
                        className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                      >
                        <img
                          className={`h-4 w-4 absolute top-1`}
                          src={luna}
                          alt="vector"
                        />
                        <img
                          className={`${
                            darkModeClient === true ? "block" : "hidden"
                          } h-4 w-4 absolute top-1`}
                          src={lunaRellena}
                          alt="vector"
                        />
                      </div>
                      <div
                        className={`${
                          darkModeClient === true
                            ? "bg-sky-200 translate-x-0"
                            : "bg-gray-100 translate-x-10"
                        } z-0 transition-all h-6 w-6 absolute rounded-full p-1`}
                      ></div>
                      <div
                        onClick={darkMode}
                        className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                      >
                        <img
                          className={`h-4 w-4 absolute top-1`}
                          src={sol}
                          alt="vector"
                        />
                        {darkModeClient === false ? (
                          <img
                            className="h-4 w-4 absolute top-1"
                            src={solRelleno}
                            alt="vector"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    className="transition ease-in-out delay-150 hover:-translate-y-1 bg-sky-300 hover:scale-110 hover:bg-bluey duration-300"
                    onClick={() => dispatch(showCart())}
                  >
                    <Cart color={actualRoute === "/" ? "#FFFFFF" : "#000000"} />
                  </button>

                  <Link
                    to="/signIn"
                    className={
                      actualRoute !== ""
                        ? "text-teal-400 hover:text-white "
                        : "text-white hover:text-white"
                    }
                  >
                    <button className="hover:bg-bluey">Inicia sesión</button>
                  </Link>

                  <Link
                    to="/signUp"
                    className={
                      actualRoute !== ""
                        ? "text-teal-400 hover:text-white"
                        : "text-white hover:text-white"
                    }
                  >
                    <button className="hover:bg-bluey">Regístrate</button>
                  </Link>
                </>
              )}
            </article>
          </li>
        </ul>
      </div>

      <div className="block md:hidden">
        <div
          className={`${
            darkModeClient === true ? "dark bg-slate-900" : "bg-white"
          } transition-all flex flex-row justify-around items-center fixed w-full h-24  z-20 shadow-blue-500/50`}
        >
          <Link to="/">
            <img
              src={homeLogo}
              alt="home route image"
              className={`${
                darkModeClient === true
                  ? "bg-slate-100 rounded-full h-14 w-14 -left-5"
                  : `${styles.homeImg}`
              } relative `}
            />
          </Link>
          {/* className={`${darkModeClient === true ? 'dark bg-slate-900' : 'bg-white'} transition-all `} */}

          <div className="text-teal-400 cursor-pointer" onClick={toggleSideBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>

        <div
          className={`w-screen h-screen bg-black/[.8] fixed z-20 top-0 ${
            sideBarIsOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="absolute z-30 text-white top-10 right-10 cursor-pointer hover:scale-150 hover:text-teal-400"
            onClick={toggleSideBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="h-full w-full flex flex-col justify-center items-center gap-y-5">
            <Link className="text-white" to="/" onClick={toggleSideBar}>
              Home
            </Link>
            <Link className="text-white" to="/alls" onClick={toggleSideBar}>
              Productos
            </Link>
            <Link className="text-white" to="/about" onClick={toggleSideBar}>
              Nosotros
            </Link>
            <button
              className="transition ease-in-out delay-150 hover:-translate-y-1 bg-slate-300 hover:scale-110 hover:bg-bluey duration-300"
              onClick={() => dispatch(showCart())}
            >
              <Cart color="#000000" />
            </button>
            <div className="w-full flex justify-center">
              <div
                className={`${
                  darkModeClient === true ? "bg-sky-700" : "bg-slate-400"
                } flex relative p-2 w-20 justify-between rounded-full`}
              >
                <div
                  onClick={darkMode}
                  className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                >
                  <img
                    className={`h-4 w-4 absolute top-1`}
                    src={luna}
                    alt="vector"
                  />
                  <img
                    className={`${
                      darkModeClient === true ? "block" : "hidden"
                    } h-4 w-4 absolute top-1`}
                    src={lunaRellena}
                    alt="vector"
                  />
                </div>
                <div
                  className={`${
                    darkModeClient === true
                      ? "bg-sky-200 translate-x-0"
                      : "bg-gray-100 translate-x-10"
                  } z-0 transition-all h-6 w-6 absolute rounded-full p-1`}
                ></div>
                <div
                  onClick={darkMode}
                  className="relative cursor-pointer z-10 h-6 w-6 rounded-full p-1"
                >
                  <img
                    className={`h-4 w-4 absolute top-1`}
                    src={sol}
                    alt="vector"
                  />
                  {darkModeClient === false ? (
                    <img
                      className="h-4 w-4 absolute top-1"
                      src={solRelleno}
                      alt="vector"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            {access ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                >
                  <img
                    src={image?.url || image || imageLocal?.url || imageLocal}
                    alt="profile picture logo"
                    className={styles.userProfile}
                  />
                </button>

                <button
                  onClick={signOut}
                  className='flex items-center gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"'
                >
                  <LogOut color="#FFFFFF" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signIn"
                  onClick={toggleSideBar}
                  className={
                    actualRoute !== ""
                      ? "text-teal-400 hover:text-white "
                      : "text-white hover:text-white"
                  }
                >
                  <button className="hover:bg-bluey">Inicia sesión</button>
                </Link>
                <Link
                  to="/signUp"
                  onClick={toggleSideBar}
                  className={
                    actualRoute !== ""
                      ? "text-teal-400 hover:text-white"
                      : "text-white hover:text-white"
                  }
                >
                  <button className="hover:bg-bluey">Regístrate</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
