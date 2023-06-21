import { Link } from "react-router-dom";

import FeaturedSegment from "../CardsProduct/FeaturedSegment";
import GenresHome from "../GenresHome/GenresHome";

import stylesHome from "../Home/Home.module.css";
import marcas1 from "../../assets/marcas1.png";
import marcas2 from "../../assets/marcas2.png";
import marcas3 from "../../assets/marcas3.png";
import marcas4 from "../../assets/marcas4.png";
import marcas5 from "../../assets/marcas5.png";

const brands = [marcas1, marcas2, marcas3, marcas4, marcas5];

const Home = () => {
  return (
    <div className="dark:bg-slate-900 transition-all relative z-0">
      <div id={stylesHome.backgroundHome} className="h-screen">
        <article className="m-3 mt-36 mb-14 p-3">
          <h1 className="md:text-7xl text-5xl text-white font-medium">Just buy it</h1>
          <p className="md:text-3xl text-2xl md:mt-0 mt-10 text-white font-light">
            Descubre nuevos estilos
          </p>
        </article>
        <Link to="/alls" className="text-white hover:text-black">
          <button className=" cursor-pointer border md:px-20 px-10 rounded-sm border-bluey">Comprar ya!</button>
        </Link>
      </div>
      <div className="h-[60vh] w-auto"></div>
      <div className="h-fit w-full mt-6 -mb-20  flex justify-start">
        <h2 className="text-[40px] text-black dark:text-slate-200 font-bold ms-20">
          Nuevos <strong className="text-teal-400"> estilos </strong>
        </h2>
      </div>
      <FeaturedSegment />
      <div className="w-full bg-black overflow-x-auto md: flex flex-col p-10 text-left">
        <Link to={"/admin?pestaña=dashboard"}>
          <h2 className="ms-20 mb-8 font-bold text-2xl">Nuestras marcas</h2>
        </Link>
        <div className="flex w-full md:justify-evenly justify-start ">
          {brands.map((b, i) => {
            return (
              <img
                className={stylesHome.imgBrands}
                key={i}
                src={b}
                alt="brands"
              />
            );
          })}
        </div>
      </div>
      <GenresHome />
      <section className="w-full text-left mt-12">
        <h2 className="text-black -mb-20 dark:text-slate-200 text-2xl font-bold ms-32">
          Algunos productos
        </h2>
        <FeaturedSegment />
      </section>
    </div>
  );
};

export default Home;
