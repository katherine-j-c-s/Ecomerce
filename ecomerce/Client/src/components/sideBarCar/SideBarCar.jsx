import CardsProduct from "../CardsProduct/CardsProduct";
import styles from "../sideBarCar/SideBarCar.module.css";

const products = [
  {
    id: 1,
    name: "Zapatillas",
    price: 1000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..",
  },
  {
    id: 2,
    name: "Zapatillas",
    price: 1000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..",
  },
];

export default function SideBarCar() {
  return (
    <aside className={styles.sideMenu}>
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
            <p className="text-black font-bold">2</p>
          </article>
        </li>

        <li>
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
        </li>
      </ul>

      <section className="m-5 p-8 flex flex-wrap items-center justify-center gap-16">
        {products.map((product, i) => {
          return (
            <article
              key={i}
              className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4"
            >
              <CardsProduct
                name={product.name}
                image={product.image}
                price={product.price}
                sideBarMenu={true}
              />

              <article className="flex flex-wrap flex-col items-center justify-center gap-5">
                <h2 className="text-gray-600 font-bold capitalize text-xl">
                  {product.name}
                </h2>
                <p className="text-gray-600 lg:text-center">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>

                <p className="text-gray-600 font-bold uppercase text-lg">xl</p>

                <ul className="flex flex-wrap items-center jusfity-center gap-4">
                  <li>
                    <button className="p-2 bg-bluey rounded-full">
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
                    <p className="text-gray-600 font-bold text-lg">2</p>
                  </li>

                  <li>
                    <button className="p-2 bg-gray-300 rounded-full">
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
        <button className="px-8 rounded-sm bg-bluey capitalize lg:relative left-40">
          comprar $50.000
        </button>
      </section>
    </aside>
  );
}
