import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import Details from "./views/Details/Details";
import Footer from "./components/Footer/Footer";
import SignIn from "./views/SignIn/SignIn";
import SideBarCar from "./components/sideBarCar/SideBarCar";

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
        <Route path="/women" element={<h1>women</h1>}></Route>
        <Route path="/man" element={<h1>man</h1>}></Route>
        <Route path="/kids" element={<h1>kids</h1>}></Route>
        <Route path="/alls" element={<h1>alls</h1>}></Route>
        <Route path="/signIn" element={<SignIn/>}></Route>
        <Route path="/signUp" element={<h1>sign up</h1>}></Route>
        <Route path="/product/:id" element={<Details/>}></Route>
      </Routes>
      {location.pathname === "/signIn" || location.pathname === "/signUp" ? null : (
        <Footer/>
      )}
    </>
  );
}

export default App;
