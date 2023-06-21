import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
import SignIn from "./views/SignIn/SignIn";
import SideBarCar from "./components/sideBarCar/SideBarCar";
import SignUp from "./views/SignUp/SignUp";
import Products from "./views/Products/Products";
import Admin from "./views/Admin/Admin";
import Profile from "./views/Profile/Profile";
import Cart from "./views/Cart/Cart";

function App() {
  const location = useLocation();
  const {darkModeClient} = useSelector((st)=>st)
  const { enable } = useSelector((state) => state.sideBarCar);

  return (
    <>
      {enable ? <SideBarCar /> : null}
      {location.pathname === "/signIn" ||
      location.pathname === "/signUp" ||
      location.pathname === "/cart" ||
      location.pathname === "/admin" ? null : (
        <Nav/>
      )}
      <Routes>
        <Route path="/" element={<ViewHome />} className={darkModeClient === true ? '' : 'dark'} />
        <Route path="/alls" element={<Products />} className={darkModeClient === true ? '' : '  '} />
        <Route path="/about" element={<h1>about</h1>} className={darkModeClient === true ? '' : 'dark'} />
        <Route path="/product/:id" element={<Details />} className={darkModeClient === true ? '' : 'dark'} />
        <Route path="/profile" element={<Profile />} className={darkModeClient === true ? '' : 'dark'} />
        <Route path="/cart" element={<Cart/>} className={darkModeClient === true ? '' : 'dark'} />
         
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        
        <Route path="/admin" element={<Admin />} />
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
