import React from 'react'

export default function CardGenres({title,desc,img}) {
  return (
    <div className='flex w-1/5 justify-center flex-col align-middle'>
        <div className='flex relative h-full w-full justify-center align-bottom'>
            <img className='h-52 z-10' src={img} alt={title} />
            <div className='absolute bottom-0 h-44 w-44 shadow-xl rounded-lg '></div>
        </div>
        <h2 className='text-cyan-400 font-bold'>{title}</h2>
        <p className='text-black'>{desc}</p>
    </div>
  )
}