import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<ViewHome />}></Route>
        <Route path="/women" element={<h1>women</h1>}></Route>
        <Route path="/man" element={<h1>man</h1>}></Route>
        <Route path="/kids" element={<h1>kids</h1>}></Route>
        <Route path="/alls" element={<h1>alls</h1>}></Route>
        <Route path="/signin" element={<h1>sign in</h1>}></Route>
        <Route path="/signup" element={<h1>sign up</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;