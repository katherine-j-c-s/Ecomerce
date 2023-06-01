import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
import SignIn from "./views/SignIn/SignIn";
import SideBarCar from "./components/sideBarCar/SideBarCar";
import SignUn from "./views/SignUp/SignUp";
import Products from "./views/Products/Products";
import Admin from "./views/Admin/Admin";


function App() {
  const location = useLocation();
  return (
    <>
      {/* <SideBarCar /> */}
      {location.pathname === "/signIn" || location.pathname === "/signUp" || location.pathname === "/admin" ? null : (
        <Nav/>
      )}
      <Routes>
        <Route path="/" element={<ViewHome />}/>
        <Route path="/women" element={<Products/>}/>
        <Route path="/man" element={<Products/>}/>
        <Route path="/kids" element={<Products/>}/>
        <Route path="/alls" element={<Products/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUn/>}/>
        <Route path="/product/:id" element={<Details/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      {location.pathname === "/signIn" || location.pathname === "/signUp" || location.pathname === "/admin" ? null : (
        <Footer/>
      )}
    </>
  );
}

export default App;
