import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function UserDetailAdmin() {
  let {user} = useSelector(st=>st)
  useEffect(()=>{
    console.log(user);
  })
  return (
    <div className='w-screen mt-20 relative'>
      <Link to={"/admin?pestaña=usuarios"}>
        <p className='text-sky-400 absolute cursor-pointer -top-14 right-10'>Volver</p>
      </Link>
      <div className='w-8/12 mx-auto h-fit flex justify-center'>
        <div className='w-2/4 h-fit'>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Nº :</p>
            <p className='font-bold text-slate-500 ml-3'>{user.id}</p>
          </div>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Nombre :</p>
            <p className='font-mono text-slate-500 ml-3'>{user.first_name}</p>
          </div>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Apellido :</p>
            <p className='font-mono text-slate-500 ml-3'>{user.last_name}</p>
          </div>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Mail :</p>
            <p className='font-mono text-slate-500 ml-3'>{user.mail}</p>
          </div>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Direccion :</p>
            <p className='font-mono text-slate-500 ml-3'>{user.address}</p>
          </div>
          <div className='flex w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Estado :</p>
            <p className='font-mono text-slate-500 ml-3'>{user.status}</p>
          </div>
        </div>
        <div className='w-2/4'>
          <div>
            <img className=' w-56  h-56 rounded-full' src={user.image.url} alt="img" />
          </div>
        </div>
      </div>
      <div className='w-2/5 mx-auto'>
        <p className='text-sky-400 font-bold my-3'>Orders</p>
        {user.Orders.length > 0 ?
          (<div className='bg-white rounded-md'> 
            <p className='text-slate-500 py-2'>Si ha comprado</p>
          </div>)
        : 
          (<div className='bg-white rounded-md'> 
            <p className='text-slate-500 py-2'>Ninguno</p>
          </div>)
        }
      </div>
      <div className='w-3/5 mx-auto'>
        <p className='text-sky-400 font-bold my-3'>Comments</p>
        {user.Comments.length > 0 ?
          (<div className='bg-white rounded-md'> 
            <p className='text-slate-500 py-2'>Si ha comprado</p>
          </div>)
        : 
          (<div className='flex justify-between'>
            <div className='bg-white w-5/12 rounded-lg'> 
              <p className='text-slate-500 py-12'>...</p>
            </div>
            <div className='bg-white w-5/12 rounded-lg'> 
              <p className='text-slate-500 py-12'>...</p>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}
