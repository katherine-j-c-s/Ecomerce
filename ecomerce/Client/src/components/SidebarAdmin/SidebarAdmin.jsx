import React from 'react'
import { Link } from 'react-router-dom'

import imagen1 from '../../assets/Vector.png'
import imagen2 from '../../assets/Vector1.png'
import imagen3 from '../../assets/Vector2.png'
import imagen4 from '../../assets/Vector3.png'
import imagen5 from '../../assets/Vector4.png'
import imagenOut from '../../assets/VectorOut.png'

export default function SidebarAdmin() {
  return (
    <aside className='flex flex-col align-middle justify-between w-60 h-screen bg-slate-200 shadow-lg'>
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
  );
}
