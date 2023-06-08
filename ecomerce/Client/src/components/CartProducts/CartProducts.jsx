import React from 'react'

export default function CartProducts() {
  return (
    <div className='flex flex-row h-24 w-full justify-between my-4'>
        <div className='w-24 h-24 rounded bg-white relative'>
            <img className='object-cover w-full h-full ' src="https://th.bing.com/th/id/OIP.tXSwoiXO2CuTZM-eGvZWcAAAAA?pid=ImgDet&rs=1" alt="tabas" />
            <div className='w-7 h-7 rounded-full bg-cyan-500 absolute -top-4 -right-4'>
                <span className='text-white text-xs'>10</span>
            </div>
        </div>
        <div className='flex flex-col w-auto h-full justify-center items-start text-[#8D8D8D]'>
            <span className='text-start'><strong>Ropa deportiva femenina</strong></span>
            <span className='text-start'>XS</span>
        </div>
        <span className='text-lg text-[#8D8D8D] flex flex-col w-auto h-full justify-center items-center'>$120000</span>
    </div>

  )
}
