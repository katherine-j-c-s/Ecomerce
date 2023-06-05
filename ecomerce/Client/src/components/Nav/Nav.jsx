import styles from "../Nav/Nav.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import homeLogo from "../../assets/HomeImage.png";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/actions";

export default function Nav() {
  const location = useLocation();
  const actualRoute = location.pathname;
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const access = useSelector((state) => state.access);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  function signOut() {
    dispatch(logOut());
    navigate("/");
  }

  return (
    <nav id={styles.navBackground}>
      <div className="hidden md:block">
        <ul className="flex flex-wrap items-center justify-between p-4">
          <li>
            <article className="flex items-center justify-center p-3 gap-5">
              <Link to="/">
                <img
                  src={homeLogo}
                  alt="home route image"
                  className={styles.homeImg}
                />
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/women"
              >
                Women
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/man"
              >
                Man
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/kids"
              >
                Kids
              </Link>
              <Link
                className={actualRoute !== "" ? "text-teal-400" : "text-white"}
                to="/alls"
              >
                Alls
              </Link>
            </article>
          </li>

          <li>
            <article className="flex items-center jusfify-center gap-5">
              {access ? (
                <>
                  <button>Cart</button>

                  <Link to="/profile">
                    <button onClick={() => navigate("/profile")}>
                      Account
                    </button>
                  </Link>

                  <button onClick={signOut}>Logout</button>
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
                    <button className="hover:bg-bluey">Sign in</button>
                  </Link>
                  <Link
                    to="/signUp"
                    className={
                      actualRoute !== ""
                        ? "text-teal-400 hover:text-white"
                        : "text-white hover:text-white"
                    }
                  >
                    <button className="hover:bg-bluey">Sign Up</button>
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
          <div className="h-full w-full flex flex-col justify-center align-center gap-y-5">
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
            <Link
              to="/signIn"
              onClick={toggleSideBar}
              className={
                actualRoute !== ""
                  ? "text-teal-400 hover:text-white "
                  : "text-white hover:text-white"
              }
            >
              <button className="hover:bg-bluey">Sign in</button>
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
              <button className="hover:bg-bluey">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
