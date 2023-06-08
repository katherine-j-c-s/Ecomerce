import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function CardsProduct({ image, price, name, sideBarMenu, seeDetails }) {
  const [hover, setHover] = useState(false);
  const location = useLocation()
  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = () => {
    setHover(false);
  }

  return (
    <div className="cursor-pointer" onClick={location.pathname === '/admin' ? null : seeDetails} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex w-64 md:w-72 h-80 lg:h-72 rounded-lg bg-white flex-col relative shadow hover:shadow-xl hover:opacity-[.6] mt-10 overflow-hidden">
        <img
          className={`select-none absolute object-cover h-full w-full left-1/2 transform ${hover ? '-translate-x-1/2 scale-110' : '-translate-x-1/2'} transition-all duration-200 ease-in-out`}
          src={image}
          alt={name}
        />
        {sideBarMenu === true ? (
          <article className={`flex flex-row absolute bottom-2 left-1/2 transform -translate-x-1/2 mb-10 space-x-8 w-full justify-center ${hover ? 'text-white' : 'text-bluey'} transition-all duration-200 ease-in-out bg-black bg-opacity-50 p-2 rounded`}>
            <p className="text-2xl font-bold capitalize truncate overflow-hidden">
              price: ${price}
            </p>
          </article>
        ) : (
          <div className="flex flex-row absolute bottom-2 left-1/4 transform -translate-x-1/2 mb-10 space-x-8 w-52 justify-center  bg-black bg-opacity-50 p-4 rounded ">
            <div className={`items-center justify-center h-10 w-24 ${hover ? 'text-teal-400' : 'text-white'} transition-all duration-200 ease-in-out`}>
              <h3 className="text-xl font-bold text-center text-shadow truncate overflow-hidden">
                ${price}
              </h3>
              <span className={`text-sm font-light leading-tight truncate overflow-hidden ${hover ? 'text-white opacity-100' : 'text-gray-600 opacity-0'} transition-all duration-200 ease-in-out`}>
                {name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
