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
function App() {
  const location = useLocation();
  return (
    <>
      {/* <SideBarCar /> */}
      {location.pathname === "/signIn" || location.pathname === "/signUp" ? null : (
        <Nav/>
      )}
      <Routes>
        <Route path="/" element={<ViewHome />}></Route>
        <Route path="/women" element={<Products/>}></Route>
        <Route path="/man" element={<Products/>}></Route>
        <Route path="/kids" element={<Products/>}></Route>
        <Route path="/alls" element={<Products/>}></Route>
        <Route path="/signIn" element={<SignIn/>}></Route>
        <Route path="/signUp" element={<SignUn/>}></Route>
        <Route path="/product/:id" element={<Details/>}></Route>
      </Routes>
      {location.pathname === "/signIn" || location.pathname === "/signUp" ? null : (
        <Footer/>
      )}
    </>
  );
}

export default App;
