import stylesHome from "../Home/Home.module.css";
import imageB from '../../images/image41.svg'
import CardsProduct from '../CardsProduct/CardsProduct'
import { Link } from "react-router-dom";

const brands = [1,2,3,4,5,6]

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
            <div className='h-[60vh] w-auto'></div>
            <div className='h-[70vh] w-auto text-left'>
                <div className="flex justify-start w-fit">
                    <h2 className="text-black mb-24 ml-36 text-2xl font-bold">New </h2>
                    <h2 className="text-sky-500 mb-24 ml-2 text-2xl font-bold">styles</h2>
                    <h2 className="text-black mb-24 ml-2 text-2xl font-bold"> just arrive</h2>
                </div>
                <div className='flex flex-row gap-4 justify-center items-center'>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/> 
                </div>
            </div>
            <div className="w-full bg-black flex flex-col p-10 text-left">
                <h2 className="ms-20 mb-8 font-bold text-2xl">Our brands</h2>
                <div className="flex w-full justify-evenly">
                    {brands.map((b,i)=>{
                        return(
                            <img key={i} src={imageB} alt={b} />
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}

export default Home;