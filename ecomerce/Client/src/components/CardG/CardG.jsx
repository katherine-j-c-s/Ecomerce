import React from 'react'

export default function CardGenres({title,desc,img}) {
  return (
    <div className='flex w-1/5 justify-center flex-col align-middle'>
        <div className='flex shadow-xl h-44 w-44 justify-center rounded-lg align-bottom'>
            <img className='relative bottom-8 h-52' src={img} alt={title} />
        </div>
        <h2 className='text-cyan-400 font-bold'>{title}</h2>
        <p>{desc}</p>
    </div>
  )
}