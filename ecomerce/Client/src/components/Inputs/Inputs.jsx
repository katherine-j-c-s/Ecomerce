import React, { useState } from 'react'

export default function Inputs({title,value , inputName, inputPlaceholder, titleWidth, handleChange, errors}) {

  return (
    <div className={errors[inputName]?.length > 0 ? 'flex flex-col justify-center w-full relative md:mb-6 mb-10' : 'flex flex-col justify-center w-full relative md:mb-6 mb-6'}>
        <label className={`absolute w-${titleWidth} bg-white h-fit bottom-10 left-8 text-cyan-400`}>
            {title}{" "}
        </label>
        <input
            className={`placeholder-slate-400 focus:outline-none ${errors[inputName]?.length > 0 ? 'border-red-500' : 'border-cyan-500'}  md:m-2 border  bg-transparent rounded-md p-2 pl-10`}
            name={inputName}
            placeholder={inputPlaceholder}
            onChange={handleChange}
            value={value}
        ></input>
        <span className={errors[inputName]?.length > 0 ? 'flex flex-block text-red-600 text-xs left-2 -bottom-4 absolute' : 'flex flex-none'}>{errors[inputName]}</span>
    </div>

  )
}
