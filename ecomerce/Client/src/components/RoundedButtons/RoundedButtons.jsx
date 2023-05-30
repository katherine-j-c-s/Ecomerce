import React from 'react'

export default function RoundedButtons({icon, color, bgColor, onClick}) {

  return (
    <div className={`flex justify-center items-center rounded-full ${bgColor} ${color} w-9 h-9 cursor-pointer mx-1`} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            {svgPaths.map((path, index) => (
            <path key={index} stroke-linecap="round" stroke-linejoin="round" d={path} />
            ))}
        </svg>
    </div>
  )
}
