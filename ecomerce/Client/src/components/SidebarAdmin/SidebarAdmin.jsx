import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDarkModeAdmin } from '../../redux/actions'

import imagen1 from '../../assets/Vector.png'
import imagen2 from '../../assets/Vector1.png'
import imagen3 from '../../assets/Vector2.png'
import imagen4 from '../../assets/Vector3.png'
import imagen5 from '../../assets/Vector4.png'

import lunaRellena from '../../assets/moon.png'
import luna from '../../assets/moon1.png'
import sol from '../../assets/sun.png'
import solRelleno from '../../assets/sun1.png'

import imagenOut from '../../assets/VectorOut.png'
import imageNotf from '../../assets/VectorNotif.png'

export default function SidebarAdmin() {
  const dispatch = useDispatch()
  let {darkModeAdmin} =  useSelector(st=>st)
  const darkMode = () => {
    if (!darkModeAdmin) {
      dispatch(addDarkModeAdmin(true))
    }else {
      dispatch(addDarkModeAdmin(false))
    }
  }
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
      <aside className={`${showSB === true ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex transition-all flex-col align-middle justify-between w-60 h-screen bg-slate-200 dark:bg-slate-950 shadow-slate-500 shadow-lg dark:shadow-black`} >
        <div className='text-left relative h-4/5 flex flex-col justify-center'>
          <p className='dark:text-sky-200 text-sky-400 font-bold absolute top-28 left-6'>Control Pannel</p>
          <div className='flex flex-col'>
            <Link to={'/admin?pestaña=dashboard'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 dark:font-mono font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1 object-contain' src={imagen1} alt="vector" />
              <p className=' font-thin hover:text-cyan-400'>Dashboard</p>
            </Link>
            <Link to={'/admin?pestaña=usuarios'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 dark:font-mono font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1 object-contain' src={imagen2} alt="vector" />
              <p className=' font-thin hover:text-cyan-400'>Usuarios</p>
            </Link>
            {/*<Link to={'/admin?pestaña=estadisticas'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 dark:font-mono font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1 object-contain' src={imagen3} alt="vector" />
              <p className=' font-thin hover:text-cyan-400'>Estadísticas</p>
            </Link>
            <Link to={'/admin?pestaña=envios'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 dark:font-mono font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1 object-contain' src={imagen4} alt="vector" />
              <p className=' font-thin hover:text-cyan-400'>Envíos</p>
            </Link>*/}
            <Link to={'/admin?pestaña=productos'} className="w-36 p-2 rounded-md flex my-2 transition-all hover:bg-teal-100 hover:text-slate-950 dark:font-mono font-thin relative align-center justify-start ml-12 text-slate-500">
              <img className='mr-4 w-5 h-4 relative top-1 object-contain' src={imagen5} alt="vector" />
              <p className=' font-thin hover:text-cyan-400'>Productos</p>
            </Link>
          </div>
        </div>
        
        <div className='h-1/5 flex relative justify-center'>
          <div className='w-full absolute top-10 flex justify-center'>
            <div className={`${darkModeAdmin === true ? 'bg-sky-700' : 'bg-slate-400'} flex relative p-2 w-20 justify-between rounded-full`}>
              <div onClick={darkMode} className='relative cursor-pointer z-10 h-6 w-6 rounded-full p-1'>
                <img className={`h-4 w-4 absolute top-1`} src={luna} alt="vector" />
                <img className={`${darkModeAdmin === true ? 'block' : 'hidden'} h-4 w-4 absolute top-1`} src={lunaRellena} alt="vector" />
              </div>
              <div className={`${darkModeAdmin === true ? 'bg-sky-200 translate-x-0' : 'bg-gray-100 translate-x-10'} z-0 transition-all h-6 w-6 absolute rounded-full p-1`}></div>
              <div onClick={darkMode} className='relative cursor-pointer z-10 h-6 w-6 rounded-full p-1'>
                <img className={`h-4 w-4 absolute top-1`} src={sol} alt="vector" />
                {darkModeAdmin === false ? <img className='h-4 w-4 absolute top-1' src={solRelleno} alt="vector" /> :null}
              </div>
            </div>
          </div>
          <Link className='absolute w-fit bottom-0 mb-7 flex' to={'/'}>
            <img className='w-5 h-4 top-1 relative mr-3' src={imagenOut} alt="logout"/>
            <p className='font-thin dark:font-mono text-slate-500'>Volver</p>
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
