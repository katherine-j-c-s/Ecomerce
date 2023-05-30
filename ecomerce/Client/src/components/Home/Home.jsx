import stylesHome from "../Home/Home.module.css";
import CardsProduct from '../CardsProduct/CardsProduct'
import { Link } from "react-router-dom";

const Home = ()=>{
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
            <div className='h-[70vh] w-auto'></div>
            <div className='h-[70vh] w-auto'>
                <h2>New styles just arrive</h2>
                <div className='flex flex-row gap-4 justify-center items-center'>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/> 
                </div>
            </div>
        </div>
    )
}

export default Home;