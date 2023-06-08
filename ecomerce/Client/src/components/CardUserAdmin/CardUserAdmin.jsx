import React from 'react'
import perfil from '../../assets/Vector1.png'
import edit from '../../assets/edit.png'
const users = [
    {
        id:1,
        name:"kathe",
        img:perfil
    },{
        id:2,
        name:"Amadeo",
        img:perfil
    },{
        id:3,
        name:"Gino",
        img:perfil
    },{
        id:4,
        name:"Agus",
        img:perfil
    },{
        id:5,
        name:"Jose",
        img:perfil
    },{
        id:6,
        name:"Jhon",
        img:perfil
    }]

export default function CardUserAdmin({id}) {
    const editType = (e) => {
        console.log(e.target.id);
    }
  return (
    <div className='mt-16 ml-1 md:ml-10'>
        <h1 className='text-slate-400 mb-8 text-xl font-bold'>Usuarios</h1>
        <div className='flex flex-wrap'>
            {users.map(u=>{
                return(
                    <div className='bg-white text-black flex p-2 m-3 justify-evenly rounded-xl' key={u.id}>
                        <div className='p-4 mx-2 bg-slate-300 rounded-full'>
                            <img className='h-5 w-5' src={u.img} alt="vector" />
                        </div>
                        <p className='mt-3 font-bold mx-5'>{u.name}</p>
                        <div className='flex mt-2'>
                            <div className='relative mr-2 z-10 w-fit h-fit p-2.5 bg-sky-500 rounded-full'>
                                <img onClick={editType} id={u.id} className=' h-3  w-3' src={edit} alt="" />
                            </div>
                            <div className="p-1.5 border-bluey w-fit h-fit border rounded-full">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                                    <path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
