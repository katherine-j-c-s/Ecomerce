import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers, userAdmin, deleteUser} from '../../redux/actions'
import swal from "sweetalert";

import edit from '../../assets/edit.png'
import { useNavigate } from 'react-router-dom'

export default function CardUserAdmin() {
    const navegate = useNavigate()
    const dispatch = useDispatch()

    const {allUsers} = useSelector(st=>st)

    useEffect(()=>{
        dispatch(getAllUsers())
    },[])
    function handleDelete(id) {
        swal({
          title: "Eliminar cuenta",
          text: "¿Estás seguro de que deseas continuar?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((confirm) => {
          if (confirm) {
            dispatch(deleteUser(id)).then((success) => {
              toast.success("Cuenta eliminada exitosamente.", {
                duration: 2000,
              });
    
              setTimeout(() => {
                toast.remove();
                dispatch(logOut());
                navegate("/admin?pestaña=usuarios");
              }, 2000);
            });
          }
        });
      }
    const userDetail = (e) =>{
        let id = e.target.id.split('/')
        let user = allUsers.find(u => u.id === Number(id[0]))
        dispatch(userAdmin(user))
        navegate('/admin?pestaña=usuarioDetail')
    }
  return (
    <div className='mt-16 h-fit ml-1 md:ml-10 dark'>
        <h1 className='text-slate-400 mb-8 text-xl font-bold'>Usuarios</h1>
        <div className='flex flex-wrap'>
            {allUsers?.map(u=>{
                return(
                    <div className='bg-white dark:text-slate-400 dark:bg-transparent dark:hover:bg-sky-700 dark:border-sky-300 dark:hover:border-sky-700 border text-black flex p-2 py-4 m-3 justify-evenly rounded-xl' key={u.id}>
                        <div className='mx-6'>
                            <img className='h-10 w-10 rounded-full' src={u.image.url} alt="vector" />
                        </div>
                        <p onClick={userDetail} id={`${u.id}/usuarioDetail`} className='mr-8 mt-3 font-bold hover:text-lg cursor-pointer dark:hover:text-slate-300 hover:text-sky-400 transition-all mx-5'>{u.first_name}</p>
                        <div className='flex mt-2'>
                            {/* <div className='relative mr-2 z-10 cursor-pointer border hover:border-black border-solid transition-all w-fit h-fit p-2.5 bg-sky-500 rounded-full'>
                                <img onClick={userDetail} id={`${u.id}/editUser`} className='h-3  w-3' src={edit} alt="" />
                            </div> */}
                            <div onClick={()=>handleDelete(u.id)} className="p-1.5 mr-3 border-bluey dark:border-none dark:bg-sky-400 dark:hover:bg-sky-200 cursor-pointer w-fit hover:bg-bluey transition-all h-fit border rounded-full">
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
