import ViewHome from "./views/Home/ViewHome";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import runnerImgFooter from "./assets/runner_img_footer.png";
import facebookLogo from "./assets/facebook.png";
import twitterLogo from "./assets/twitter.png";
import instagramLogo from "./assets/instagram.png";
import youtubeLogo from "./assets/youtube.png";
import tiktokLogo from "./assets/tiktok.png";

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
      <footer className="flex items-center justify-evenly bg-black">
        <img src={runnerImgFooter} alt="" className="footerImg" />
        <section className="flex flex-wrap flex-col items-center gap-4">
          <h2 className="p-4 text-3xl font-bold">Run faster</h2>
          <button className="px-20 rounded-sm border-bluey">VER MÁS</button>
          <article className="flex items-center justify-center p-3 gap-5">
            <img src={facebookLogo} alt="" />
            <img src={twitterLogo} alt="" />
            <img src={instagramLogo} alt="" />
            <img src={youtubeLogo} alt="" />
            <img src={tiktokLogo} alt="" />
          </article>
        </section>
      </footer>
    </>
  );
}

export default App;
