import { Link } from "react-router-dom";

export default function CardsProduct({ image, price, name, sideBarMenu, seeDetails }) {
  return (
    <div className="cursor-pointer" onClick={seeDetails}>
      <div className="flex w-64 md:w-72 h-80 lg:h-72 rounded-lg bg-white flex-col relative shadow hover:shadow-xl mt-10">
        <img
          className="select-none absolute -top-10 left-1/2 transform -translate-x-1/2 mx-2 "
          src={image}
          alt={name}
        />

        {sideBarMenu === true ? (
          <article className="flex flex-row absolute bottom-2 left-1/2 transform -translate-x-1/2 mb-10 space-x-8 w-full justify-center">
            <p className="text-bluey text-2xl font-bold capitalize">
              price: ${price}
            </p>
          </article>
        ) : (
          <div className="flex flex-row absolute bottom-2 left-1/4 transform -translate-x-1/2 mb-10 space-x-8 w-full justify-center">
            <div className="items-start h-10 w-24">
              <h3 className="text-xl font-bold text-teal-400 text-left ">
                ${price}
              </h3>
              <span className="text-sm font-light text-gray-600 leading-tight truncate overflow-hidden overflow-ellipsis">
                {name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
