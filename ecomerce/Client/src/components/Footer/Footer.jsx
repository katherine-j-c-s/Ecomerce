import React from 'react'
import runnerImgFooter from "../../assets/runner_img_footer.png";
import facebookLogo from "../../assets/facebook.png";
import twitterLogo from "../../assets/twitter.png";
import instagramLogo from "../../assets/instagram.png";
import youtubeLogo from "../../assets/youtube.png";
import tiktokLogo from "../../assets/tiktok.png";

export default function Footer() {
  return (
    <footer className="flex relative items-center justify-end bg-black">
        <img className="absolute left-52 w-52 h-auto z-10 bottom-0" src={runnerImgFooter} alt=""/>
        <section className="flex mr-60 my-6 flex-wrap flex-col items-center gap-4">
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
  )
}
