import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductById,
  clearProductDetail,
  productToEdit,
  addProductCart,
  showCart,
} from "../../redux/actions";

export default function Details() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const navigate = useNavigate();
  const detail = useSelector((state) => state.productDetail);
  let {darkModeClient} = useSelector(st=>st)

  const [fixedImage, setFixedImage] = useState("");
  const [loadedImage, setLoadedImage] = useState(false);
  const colores = [
    {
      id: 1,
      color: "rojo",
      hex: "#FF0000",
    },
    {
      id: 2,
      color: "negro",
      hex: "#000000",
    },
    {
      id: 3,
      color: "blanco",
      hex: "#FFFFFF",
    },
    {
      id: 4,
      color: "gris",
      hex: "#808080",
    },
    {
      id: 5,
      color: "azul",
      hex: "#0000FF",
    },
    {
      id: 6,
      color: "verde",
      hex: "#008000",
    },
    {
      id: 7,
      color: "amarillo",
      hex: "#FFFF00",
    },
    {
      id: 8,
      color: "naranja",
      hex: "#FFA500",
    },
    {
      id: 9,
      color: "beige",
      hex: "#F5F5DC",
    },
    {
      id: 10,
      color: "rosa",
      hex: "#FFC0CB",
    },
    {
      id: 11,
      color: "morado",
      hex: "#800080",
    },
    {
      id: 12,
      color: "cian",
      hex: "#00FFFF",
    },
  ];
  const handleFixedImage = (url) => {
    setFixedImage(url);
  };

  function addProductCar() {
    let newProduct = {
      id: detail.id,
      name: detail.name,
      price: detail.price,
      image: detail?.image?.url ? detail.image.url : detail?.image?.[0],
      description: detail.description,
      quantity: 1,
    };
    dispatch(addProductCart(newProduct));
    dispatch(showCart());
  }

  useEffect(() => {
    dispatch(getProductById(id));
    return () => {
      dispatch(clearProductDetail());
      setFixedImage("");
    };
  }, [id, dispatch]);

  useEffect(() => {
    let image = detail?.image?.[0];
    console.log(image);
    if (image?.url !== undefined) {
      setFixedImage(image.url);
    } else {
      setFixedImage(image);
    }
  }, [detail]);
  console.log(detail)
  return (
    <article className={!darkModeClient ? '' : 'dark bg-slate-950 pt-10'}>
        <div className="h-auto flex flex-col px-4 sm:px-8 lg:px-[60px] mt-10 dark:mt-0 sm:mt-20">
        <div className="w-full h-auto flex flex-col sm:flex-row">
          <div className="basis-[10%] mx-2 sm:mx-10 flex flex-col gap-y-4 sm:gap-y-6">
            {detail?.image &&
              detail.image
                .filter((image) => image !== fixedImage)
                .map((ima, index) => {
                  let image = null;
                  if (ima.url !== undefined) {
                    image = ima.url;
                  } else {
                    image = ima;
                  }
                  return (
                    <img
                      onLoad={() => setLoadedImage(true)}
                      style={{
                        opacity: loadedImage ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                      key={index}
                      onClick={() => handleFixedImage(image)}
                      className="w- h-32 object-cover cursor-pointer hover:opacity-[.8]"
                      src={image}
                      alt="imagendeProducto"
                    />
                  );
                })}
          </div>
          <div className="basis-[45%] flex justify-center items-center mt-10 sm:mt-0">
            <img
              onLoad={() => setLoadedImage(true)}
              style={{ opacity: loadedImage ? 1 : 0, transition: "opacity 0.3s" }}
              className="w-full object-cover"
              src={fixedImage}
              alt="imagendeProducto"
            />
          </div>
          <div className="basis-[45%] flex flex-col justify-center items-start ml-2 sm:ml-12 mt-10 sm:mt-0">
            <div className="flex flex-row text-left text-black dark:text-slate-200 font-thin ">
              <span className="cursor-pointer" onClick={() => navigate("/")}>
                HOME/
              </span>
              <span>PRODUCTS/</span>
              <span>DETAIL</span>
            </div>
            <h1 className="text-5xl text-left font-bold text-teal-400 ">
              {detail.name}
            </h1>
            <h4 className="text-black dark:text-slate-200 mt-6 text-left text-2xl">
              ${detail.price}
            </h4>
            <div className="h-[1px] opacity-[.4] my-4 w-full bg-black dark:bg-slate-300"></div>
            <h3 className="text-black dark:text-slate-200 font-thin mt-6 text-left text-2xl mb-6">
              Talla
            </h3>
            <div className="flex flex-row">
              <div className="cursor-pointer hover:bg-black flex flex-col h-10 w-10 bg-teal-400 justify-center align-center mx-1">
                <h1 className="hover:text-white text-xl ma-0 font-bold text-black opacity-[.4]">
                  {detail.size}
                </h1>
              </div>
              {/*tallas.map((talla, index) => {
                          return(
                              <div key={index} className='cursor-pointer hover:bg-black flex flex-col h-10 w-10 bg-teal-400 justify-center align-center mx-1'>
                                  <h1 className='hover:text-white text-xl ma-0 font-bold text-black opacity-[.4]'>{talla}</h1>
                              </div>
                          )
                      })*/}
            </div>
            <h3 className="text-black dark:text-slate-200 font-thin mt-6 mb-6 text-left text-2xl">
              Color
            </h3>
            <div className="flex flex-row">
              <div
                style={{
                  backgroundColor: colores.find(
                    (item) => item.color === detail.color
                  )?.hex,
                }}
                className={`cursor-pointer flex flex-col h-10 w-10 justify-center align-center mx-1 rounded-full text-black`}
              ></div>

              {/*colores.map((color, index) => {
                          return(
                              <div key={index} style={{ backgroundColor: color }} className={`cursor-pointer flex  flex-col h-10 w-10 justify-center align-center mx-1 rounded-full`}></div>
                          )
                      })*/}
            </div>
            <button
              className="mx-10 my-10 p-4 bg-black dark:bg-teal-400 dark:text-black text-white rounded"
              onClick={addProductCar}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        <div className="flex h-auto flex-col w-full mt-10">
          <h2 className="font-bold text-2xl text-black dark:text-slate-200 text-start my-6 ">
            Descripción
          </h2>
          <span className="text-black dark:text-slate-200 mb-0 text-justify">{detail.description}</span>
        </div>
        <div className="flex h-auto flex-col w-full my-10">
        <h2 className="font-bold text-2xl text-black dark:text-slate-200 text-start my-6">
          Comentarios
        </h2>
        {detail?.comments?.length > 0 ? (
          detail.comments.map((item) => (
            <div className="w-full my-6 flex md:flex-row flex-col" key={item.id}>
              <div className="w-12 h-12 bg-slate-400 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div className="w-full md:ml-10 ml-0">
                <div className="flex justify-start items-center text-cyan-400 py-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                        fill={index <= item.rate ? "currentColor" : "none"}
                      />
                    </svg>
                  ))}
                </div>
                <div className="flex justify-start items-center w-full h-auto bg-slate-100 rounded">
                  <span className="text-black text-start m-4">{item.content}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black text-start">No hay comentarios disponibles.</p>
        )}
      </div>

      </div>
    </article>
  );
}
