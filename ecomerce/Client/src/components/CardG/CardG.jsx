import React from 'react'

export default function CardGenres({title,desc,img}) {
  return (
    <div className='flex w-full px-10 mb-8 justify-center flex-col align-middle md:w-1/5'>
        <div className='flex relative h-full w-full justify-center align-bottom'>
            <img className='h-52 z-10' src={img} alt={title} />
            <div className='absolute bottom-0 h-44 w-44 dark:bg-slate-800 shadow-xl rounded-lg '></div>
        </div>
        <h2 className='text-cyan-400 font-bold mt-3'>{title}</h2>
        <p className='text-black dark:text-slate-300 dark:font-mono mt-2'>{desc}</p>
    </div>
  )
}