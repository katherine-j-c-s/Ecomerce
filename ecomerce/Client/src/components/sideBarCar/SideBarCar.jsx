import CardsProduct from "../CardsProduct/CardsProduct";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addQuantityProduct,
  deleteQuantityProduct,
  disableCart,
} from "../../redux/actions";
import { Divide } from "iconoir-react";

export default function SideBarCar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { products,  total } = useSelector((state) => state.sideBarCar);

  const userInfo = localStorage.getItem("userData");

  const { access } = JSON.parse(userInfo);

  function handleBuy() {
    if (access === false) {
      navigate("/signIn");
      dispatch(disableCart());
    } else {
      navigate("/cart");
      dispatch(disableCart());
    }
  }

  return (
    <aside className="absolute bg-white z-30 right-0 md:w-6/12 w-full h-screen">
      <ul className="p-4 flex items-center justify-between ">
        <li>
          <article className="flex items-center gap-2">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M19.26 9.696l1.385 9A2 2 0 0118.67 21H5.33a2 2 0 01-1.977-2.304l1.385-9A2 2 0 016.716 8h10.568a2 2 0 011.977 1.696zM14 5a2 2 0 10-4 0"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="text-black font-bold">{products.length}</p>
          </article>
        </li>

        <li>
          <button onClick={() => dispatch(disableCart())}>
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </li>
      </ul>

      <section className="m-5 p-8 flex flex-wrap flex-col items-center justify-center gap-16">
        {products.length <= 0 ? (
          <div className="text-black">Carrito vacío</div>
        ) : null}

        {products.map((product, i) => {
          let image = [];
          if (product.image.url === undefined) {
            image.push(product.image);
          } else {
            image.push(product.image.url);
          }
          return (
            <article
              key={i}
              className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4"
            >
              <CardsProduct
                name={product.name}
                image={image[0]}
                price={product.price}
                sideBarMenu={true}
              />

              <article className="flex flex-wrap flex-col items-center justify-center gap-5">
                <h2 className="text-gray-600 font-bold capitalize text-xl">
                  {product.name}
                </h2>
                <p className="text-gray-600 lg:text-center h-24 overflow-hidden whitespace-pre-wrap overflow-ellipsis">
                  {product.description}
                </p>

                <p className="text-gray-600 font-bold uppercase text-lg">xl</p>

                <ul className="flex flex-wrap items-center jusfity-center gap-4">
                  <li>
                    <button
                      className="p-2 bg-bluey rounded-full"
                      onClick={() => dispatch(addQuantityProduct(i))}
                    >
                      <svg
                        width="24px"
                        height="24px"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#000000"
                      >
                        <path
                          d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </li>

                  <li>
                    <p className="text-gray-600 font-bold text-lg">
                      {product.quantity}
                    </p>
                  </li>

                  <li>
                    <button
                      className="p-2 bg-gray-300 rounded-full"
                      onClick={() => dispatch(deleteQuantityProduct(i))}
                    >
                      <svg
                        width="24px"
                        height="24px"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#000000"
                      >
                        <path
                          d="M6 12h12"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </article>
            </article>
          );
        })}

        {products.length <= 0 ? (
          <button
            className="px-8 rounded-sm bg-blue-300 capitalize lg:relative left-40"
            disabled
          >
            comprar ${total}
          </button>
        ) : (
          <button
            className="px-8 rounded-sm bg-bluey capitalize lg:relative left-40"
            onClick={handleBuy}
          >
            comprar ${total}
          </button>
        )}
      </section>
    </aside>
  );
}
