import styles from "../Nav/Nav.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import homeLogo from "../../assets/Logo_Marca_Personal_Minimalista_Elegante_y_Organico_Blanco_y_Negro_1-removebg-preview.png";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logOut, getUserId } from "../../redux/actions";
import { Cart, LogOut } from "iconoir-react";
import toast, { Toaster } from "react-hot-toast";

export default function Nav() {
  const location = useLocation();
  const actualRoute = location.pathname;
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const { image, access } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    dispatch(getUserId(userId));
  }, []);

  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  function signOut() {
    toast((t) => (
      <span>
        ¿Seguro de cerrar sesión?
        <button
          className="hover:bg-bluey hover:text-white"
          onClick={() => {
            dispatch(logOut());
            navigate("/");
            toast.dismiss(t.id);
          }}
        >
          Cerrar sesión
        </button>
      </span>
    ));
  }

  return (
    <nav className="bg-transparent">
      <div>
        <Toaster />
      </div>
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
                  className='md:h-20 md:w-20 h-10 w-10 absolute md:left-0 -left-10 -top-8'
                />
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/women"
              >
                Mujeres
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/man"
              >
                Hombres
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/kids"
              >
                Niños
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/alls"
              >
                Todos
              </Link>
            </article>
          </li>

          <li>
            <article className="flex items-center jusfify-center gap-2">
              {access ? (
                <>
                  <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300">
                    <Cart color={actualRoute === "/" ? "#FFFFFF" : "#000000"} />
                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                  >
                    <img
                      src={image.url || image}
                      alt="profile picture logo"
                      className={styles.userProfile}
                    />
                  </button>

                  <button
                    onClick={signOut}
                    className={
                      actualRoute === "/"
                        ? "flex items-center gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                        : "flex items-center gap-2 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                    }
                  >
                    <LogOut
                      color={actualRoute === "/" ? "#FFFFFF" : "#000000"}
                    />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
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
        <div className="flex flex-row justify-around items-center fixed w-full h-24 bg-white z-20 shadow-blue-500/50">
          <Link to="/">
            <img
              src={homeLogo}
              alt="home route image"
              className={styles.homeImg}
            />
          </Link>

          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300">
            <Cart color="#000000" />
          </button>

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
            <Link className="text-white" to="/women" onClick={toggleSideBar}>
              Women
            </Link>
            <Link className="text-white" to="/man" onClick={toggleSideBar}>
              Man
            </Link>
            <Link className="text-white" to="/kids" onClick={toggleSideBar}>
              Kids
            </Link>
            <Link className="text-white" to="/alls" onClick={toggleSideBar}>
              Alls
            </Link>

            {access ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-bluey duration-300"
                >
                  <img
                    src={image.url}
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
