import React from 'react'

export default function DashboardCard({name,number, stat ,icon}) {
  return (
    <div className='dark:bg-transparent dark:border-dashed border dark:border-sky-200 w-64 h-40 bg-white border-gray-800  rounded md:my-0 my-4'>
        <div className='flex flex-col p-6'>                    
            <div className='flex w-full mb-3'>
                <div className='w-9 h-9 rounded-full bg-[#F5F4F7] text-cyan-400 flex justify-center items-center '>
                    {icon}
                </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col text-left'>
                    <h1 className='text-[#1C2434] dark:text-sky-200 text-2xl font-bold'>{number}</h1>
                    <span className='text-[#1C2434] dark:text-sky-200 text-xs opacity-40' >{name}</span>
                </div>
                <span className='text-[#42FF00] dark:text-sky-400 text-xs' >{stat}</span>
            </div>
        </div>
    </div>
  )
}
