import React from 'react'

export default function CartProducts({image, price, name, quantity}) {
  return (
    <div className='flex flex-row h-24 w-full justify-between my-4'>
        <div className='md:w-24 w-14 md:h-24 h-14 rounded bg-white relative'>
            <img className='object-cover w-full h-full ' src={image} alt={name} />
            <div className='w-7 h-7 rounded-full bg-cyan-500 absolute -top-4 -right-4'>
                <span className='text-white text-xs'>{quantity}</span>
            </div>
        </div>
        <div className='flex flex-col w-auto md:h-full md:mx-0 mx-4 h-fit justify-center items-start text-[#8D8D8D]'>
            <span className='text-start md:text-xl text-xs'>{name}</span>
            <span className='text-start'><strong>XS</strong></span>
        </div>
        <span className='md:text-lg text-xs text-[#8D8D8D] flex flex-col w-auto h-full justify-center items-center'>${price}</span>
    </div>

  )
}
