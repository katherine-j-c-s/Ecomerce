import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {

    const navigate = useNavigate();
    return (
        <div className='w-screen h-screen bg-black text-white flex justify-center items-center md:flex-row flex-col'>
            <div className='mr-8'>
                <div className='flex flex-row  justify-start mb-4  hover:text-cyan-400 cursor-pointer 'onClick={() => navigate("/")} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className='ml-4'>Volver al Inicio</span>
                </div>
                <h1 className='text-white font-bold text-9xl'>404</h1>
                <span className='text-cyan-400 font-light text-xl'>Página no encontrada</span>

            </div>
            <img className='w-64 h-auto' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom.png-PhotoRoom%20(6).png?alt=media&token=eedbe9c5-8135-4bd3-95f6-b809b9000fd6" alt="Hombrejugando basekt" />
        </div>
    )
}
