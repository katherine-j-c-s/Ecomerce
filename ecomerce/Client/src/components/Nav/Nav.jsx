import styles from "../Nav/Nav.module.css";

import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav id={styles.navBackground}>
      <ul className="flex flex-wrap items-center justify-between p-4">
        <li>
          <article className="flex items-center justify-center p-3 gap-5">
            <Link to="/women">Women</Link>
            <Link to="/man">Man</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/alls">Alls</Link>
          </article>
        </li>

        <li>
          <article className="flex items-center jusfify-center gap-5">
            <Link to="/signIn" className="text-white hover:text-white">
              <button className="hover:bg-bluey">Sign in</button>
            </Link>

            <Link to="/signUp" className="text-white hover:text-white">
              <button className="hover:bg-bluey">Sign Up</button>
            </Link>
          </article>
        </li>
      </ul>

      <article className="m-3 mt-36 mb-14 p-3">
        <h1 className="text-7xl text-white font-medium">Just buy it</h1>
        <p className="text-3xl text-white font-light">
          Discover our new styles
        </p>
      </article>

      <Link to="/alls" className="text-white hover:text-white">
        <button className="px-20 rounded-sm border-bluey">Buy now</button>
      </Link>
    </nav>
  );
}
