import stylesHome from "../Home/Home.css";

import { Link } from "react-router-dom";

const Home = ()=>{
    return (
        <div id={stylesHome.backgroundHome}>
            <article className="m-3 mt-36 mb-14 p-3">
                <h1 className="text-7xl text-black font-medium">Just buy it</h1>
                <p className="text-3xl text-black font-light">
                Discover our new styles
                </p>
            </article>

            <Link to="/alls" className="text-black hover:text-black">
                <button className="px-20 rounded-sm border-bluey">Buy now</button>
            </Link>
        </div>
    )
}

export default Home;