import "./App.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
import SignIn from "./views/SignIn/SignIn";
import SideBarCar from "./components/sideBarCar/SideBarCar";
import SignUn from "./views/SignUp/SignUp";
import Products from "./views/Products/Products";
import Admin from "./views/Admin/Admin";
import Profile from "./views/Profile/Profile";
import Cart from "./views/Cart/Cart";

function App() {
  const location = useLocation();

  const navigate = useNavigate();

  const Email = "grupoPF@gmail.com";

  const PASSWORD = "Semeolvido1";

  const access = useSelector((state) => state.access);

  const dispatch = useDispatch();

  useEffect(() => {
    !access;
  }, [access, navigate]);

  function signIn(userData) {
    if (
      userData.email.toString() === Email &&
      userData.password.toString() === PASSWORD
    ) {
      dispatch({ type: "SIGN_IN" });
      navigate("/");
    }
  }

  return (
    <>
      {/* <SideBarCar /> */}
      {location.pathname === "/signIn" ||
      location.pathname === "/signUp" ||
      location.pathname === "/cart" ||
      location.pathname === "/admin" ? null : (
        <Nav />
      )}
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/women" element={<Products />} />
        <Route path="/man" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/alls" element={<Products />} />
        <Route path="/signIn" element={<SignIn login={signIn} />} />
        <Route path="/signUp" element={<SignUn />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart/>} />

      </Routes>
      {location.pathname === "/signIn" ||
      location.pathname === "/signUp" ||
      location.pathname === "/profile" ||
      location.pathname === "/cart" ||
      location.pathname === "/admin" ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
