import React from 'react'

export default function CardsProduct({image, price, name, addToCart, seeDetails}) {
  return (
    <div className='flex w-72 h-80 rounded-lg bg-white flex-col relative shadow hover:shadow-xl' >
        <img  className='select-none absolute -top-10 left-1/2 transform -translate-x-1/2 mx-2' src={image} alt={name} />
        <div className='flex flex-row absolute bottom-2 left-1/2 transform -translate-x-1/2 mb-10 space-x-8 w-full justify-center'>
            <div className='items-start h-10 w-24'>
              <h3 className='text-xl font-bold text-teal-400 text-left '>${price}</h3>
              <span className='text-sm font-light text-gray-600 leading-tight truncate overflow-hidden overflow-ellipsis'>{name}</span>
            </div>
            <div className='flex flex-row justify-content items-center'>
              <div onClick={()=> addToCart()} className='flex justify-center items-center rounded-full bg-teal-400 w-9 h-9 cursor-pointer mx-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div onClick={seeDetails} className='flex justify-center items-center rounded-full bg-zinc-200 text-teal-400 w-9 h-9 cursor-pointer mx-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
        </div>
    </div>
  )
}
