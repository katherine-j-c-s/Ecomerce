import stylesHome from "../Home/Home.module.css";

import { Link } from "react-router-dom";

const Home = ()=>{
    return (
        <div id={stylesHome.backgroundHome}>
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
    )
}

export default Home;