import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import imagen1 from '../../assets/Vector.png'
import imagen2 from '../../assets/Vector1.png'
import imagen3 from '../../assets/Vector2.png'
import imagen4 from '../../assets/Vector3.png'
import imagen5 from '../../assets/Vector4.png'
import imagenOut from '../../assets/VectorOut.png'
import imageNotf from '../../assets/VectorNotif.png'

export default function SidebarAdmin() {
  const [showSB,setShowSB] = useState(false)
  return (
    <main className='md:flex z-20 md:relative absolute'>
      <div className='md:hidden'>
        <div className={`${showSB === false ? 'flex' : 'flex'} text-teal-400 cursor-pointer top-6 left-6 absolute`} onClick={()=>setShowSB(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </div>
        <div className={`${showSB === false ? 'flex right-80' : 'flex'} absolute z-30 text-slate-800 top-6 left-6 cursor-pointer hover:scale-150 hover:text-teal-400`}onClick={()=> setShowSB(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>
      <aside className={`${showSB === true ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex transition-all flex-col align-middle justify-between w-60 h-screen bg-slate-200 shadow-lg`} >
        <div className='text-left relative h-4/5 flex flex-col justify-center'>
          <p className='text-sky-200 font-bold absolute top-28 left-6'>Control Pannel</p>
          <div className='flex flex-col'>
            <Link to={'/admin?pestaña=dashboard'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1' src={imagen1} alt="vector" />
              <p>Dashboard</p>
            </Link>
            <Link to={'/admin?pestaña=usuarios'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1' src={imagen2} alt="vector" />
              <p>Usuarios</p>
            </Link>
            <Link to={'/admin?pestaña=estadisticas'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1' src={imagen3} alt="vector" />
              <p>Estadísticas</p>
            </Link>
            <Link to={'/admin?pestaña=envios'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1' src={imagen4} alt="vector" />
              <p>Envíos</p>
            </Link>
            <Link to={'/admin?pestaña=productos'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1' src={imagen5} alt="vector" />
              <p>Productos</p>
            </Link>
          </div>
        </div>
        <div className='h-1/5 flex relative justify-center'>
          <Link className='absolute w-fit bottom-0 mb-7 flex' to={'/'}>
            <img className='w-5 h-4 top-1 relative mr-3' src={imagenOut} alt="logout"/>
            <p className='font-thin text-slate-500'>Log out</p>
          </Link> 
        </div>
      </aside>
      <nav className={`${showSB === true ? 'translate-x-0' : '-translate-x-60'} absolute transition-all md:left-8 top-2 left-20 mt-4`}>
        <div className='flex relative text-slate-500'>
          <img className='w-4 h-4 mt-1' src={imageNotf} alt="vector" />
          <p className='md:ml-12 ml-6 mr-2'>User Name</p>
          <img className='w-4 h-4 mt-1' src={imagen2} alt="verctor" />
        </div>
      </nav>      
    </main>
  );
}
