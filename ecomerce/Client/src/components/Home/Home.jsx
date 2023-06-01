import { Link } from "react-router-dom";

import FeaturedSegment from "../CardsProduct/FeaturedSegment";
import GenresHome from "../GenresHome/GenresHome";

import stylesHome from "../Home/Home.module.css";
import imageB from "../../assets/image41.svg";

const brands = [1, 2, 3, 4, 5, 6];

const Home = () => {
  return (
    <div>
      <div id={stylesHome.backgroundHome} className="h-screen">
        <article className="m-3 mt-36 mb-14 p-3">
          <h1 className="text-7xl text-white font-medium">Just buy it</h1>
          <p className="text-3xl text-white font-light">
            Discover our new styles
          </p>
        </article>
        <Link to="/alls" className="text-white hover:text-black">
            <button className="px-20 rounded-sm border-bluey">Buy now</button>
        </Link>
      </div>
      <div className='h-[60vh] w-auto'></div>
      <div className='h-fit w-full flex justify-start'>
          <h2 className='text-[40px] text-black font-bold ms-20'>
              New <strong className='text-teal-400'> styles </strong> just arrive
          </h2>
      </div>
      <FeaturedSegment/>
      <div className="w-full bg-black overflow-x-auto md: flex flex-col p-10 text-left">
          <Link to={'/admin?pestaña=dashboard'}>
            <h2 className="ms-20 mb-8 font-bold text-2xl">Our brands</h2>
          </Link>
          <div className="flex w-full md:justify-evenly justify-start ">
              {brands.map((b,i)=>{
                  return(
                      <img className="mx-2" key={i} src={imageB} alt={b} />
                  )
              })}
          </div>
      </div>
      <GenresHome/>
      <section className="w-full text-left mt-12">
        <h2 className="text-black text-2xl font-bold ms-20">Some Products</h2>
        <FeaturedSegment/>
      </section>
    </div>
  );
};

export default Home;
