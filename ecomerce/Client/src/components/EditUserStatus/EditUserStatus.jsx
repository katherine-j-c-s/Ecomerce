import React, { useEffect, useState } from 'react'

export default function EditUserStatus({close,user}) {
    let [stado,setStado] = useState(null)
    useEffect(()=>{
        if (user?.role === 'admin') {
            setStado('admin')
        }else if (user?.role === 'client') {
            console.log(user);
            setStado('Cliente')
        }else if (user?.role !== 'admin' & user?.role !== 'client') {
            setStado('')
        }
    },[user])
  return (
    <div className='w-full flex justify-center z-40 absolute top-32'>
        <div className='bg-slate-400 w-96 rounded-2xl px-3 text-white h-fit py-10'>
            <div className='relative'>
                <p className='absolute -top-9 text-slate-950 font-bold left-1 cursor-pointer text-xl ' onClick={()=>close()}>x</p>
            </div>
            <h1 className='text-3xl text-slate-900 font-mono'>¿Queries {stado !== null ? 'Desactivar':'activar'} al {stado} ?</h1>
            <div className='w-full mt-6 flex justify-center'>
                <p className='hover:bg-sky-300 cursor-pointer hover:text-slate-900 transition-all p-2 rounded-lg w-10 h-10s mr-10'>Si</p>
                <p className='hover:bg-sky-300 cursor-pointer hover:text-slate-900 transition-all p-2 rounded-lg w-10 h-10s '>No</p> 
            </div>
        </div>
    </div>
    
  )
}
