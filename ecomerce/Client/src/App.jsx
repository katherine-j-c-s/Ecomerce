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
import NotFound from "./views/NotFound/NotFound";
import Success from "./views/Success/Success";
import Unsuccess from "./views/Unsuccess/Unsuccess";

function App() {
  const location = useLocation();
  const { enable } = useSelector((state) => state.sideBarCar);

  const knownPaths = [
    "/", 
    "/about",
    "/alls", 
    "/signIn", 
    "/signUp", 
    "/admin", 
    "/profile", 
    "/cart",
  ];
  const isUnknownRoute = !knownPaths.includes(location.pathname);

  const pathsWithoutNav = ["/signIn", "/signUp", "/cart", "/admin", ];
  const pathsWithoutFooter = ["/signIn", "/signUp", "/cart", "/admin", "/profile"];
  const displayNav = !pathsWithoutNav.includes(location.pathname) && !isUnknownRoute;
  const displayFooter = !pathsWithoutFooter.includes(location.pathname) && !isUnknownRoute;
  const isProductRoute = location.pathname.startsWith("/product/");
  return (
    <>
      {enable ? <SideBarCar /> : null}
      {displayNav || isProductRoute ? <Nav /> : null}
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="/alls" element={<Products />} />
        <Route path="/about" element={<h1>about</h1>} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart/>} />
         
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/success" element={<Success/>} />
        <Route path="/unsuccess" element={<Unsuccess/>} />
        <Route path="*" element={<NotFound/>} />

      </Routes>
      {displayFooter || isProductRoute ? <Footer /> : null}
    </>
  );
}

export default App;
