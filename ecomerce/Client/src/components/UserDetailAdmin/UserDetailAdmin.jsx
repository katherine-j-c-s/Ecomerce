import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getProductById } from '../../redux/actions';

export default function UserDetailAdmin() {
  let {user} = useSelector(st=>st)

  let [showProducts,setShowProducts] = useState({id:null,show:false})

  const detalleDeCompra = (order) => {
    setShowProducts({id:order.id, show:true})
  }
  return (
    <div className='w-screen mt-20 h-full md:h-screen relative'>
      <Link to={"/admin?pestaña=usuarios"}>
        <p className='text-sky-400 absolute cursor-pointer -top-14 right-10'>Volver</p>
      </Link>
      <div className='w-full md:w-8/12 mx-auto h-fit flex md:flex-row flex-col-reverse justify-center'>
        <div className='md:w-2/4 w-full h-fit'>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Nº :</p>
            <p className='font-bold dark:text-slate-300 text-slate-500 md:ml-3'>{user.id}</p>
          </div>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Nombre :</p>
            <p className='font-mono dark:text-slate-300 text-slate-500 md:ml-3'>{user.first_name}</p>
          </div>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Apellido :</p>
            <p className='font-mono dark:text-slate-300 text-slate-500 md:ml-3'>{user.last_name}</p>
          </div>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Mail :</p>
            <p className='font-mono dark:text-slate-300 text-slate-500 md:ml-3'>{user.mail}</p>
          </div>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Direccion :</p>
            <p className='font-mono dark:text-slate-300 text-slate-500 md:ml-3'>{user.address}</p>
          </div>
          <div className='flex justify-center flex-wrap w-full md:w-fit my-3 mx-auto'>
            <p className=' text-sky-300 font-bold'>Estado :</p>
            <p className='font-mono dark:text-slate-300 text-slate-500 md:ml-3'>{user.status}</p>
          </div>
        </div>
        <div className='md:w-2/4 w-full mb-10 md:mb-0'>
          <div>
            <img className=' w-56 mx-auto h-56 rounded-full' src={user.image.url} alt="img" />
          </div>
        </div>
      </div>
      <div className='w-10/12 md:w-2/5 mx-auto'>
        <p className='text-sky-400 font-bold my-3'>Orders</p>
        {user.UserOrders.length > 0 ?
          user.UserOrders.map((o,i)=>{
            return(
              <div>
                {showProducts.id === o.id ?
                  <div className='bg-neutral-900 dark:bg-slate-950 w-full h-fit md:h-screen absolute -top-20 right-0' key={o.id}> 
                    <div onClick={()=>setShowProducts({id:null,show:false})} className={`flex absolute z-30 text-white font-bold top-6 md:top-12 md:right-20 right-6 cursor-pointer hover:shadow-2xl shadow-slate-400 dark:shadow-black hover:text-teal-400`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <div className='text-black flex flex-col w-10/12 rounded-xl mt-16 md:mt-24 mx-auto bg-white dark:bg-slate-900 shadow-xl dark:shadow-black shadow-zinc-500'>
                      <p className='mt-16 text-sky-500 font-bold'>Nº {i+1}</p>
                      <div className='flex flex-wrap mt-6 md:mt-0 justify-center'>
                        <div className='md:mt-10 w-fit md:mr-20'>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>Email :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.email}</p>
                          </div>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>Ciudad :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.city}</p>
                          </div>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>Telefono :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.phone}</p>
                          </div>
                        </div>
                        <div className='md:mt-10 w-fit'>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>DNI :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.dni}</p>
                          </div>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>Direccion :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.address}</p>
                          </div>
                          <div className='flex md:flex-row flex-col md:w-fit my-3'>
                            <p className=' text-sky-500 font-bold'>Postal :</p>
                            <p className='font-mono text-slate-500 md:ml-3 dark:text-slate-300'>{o.postal}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='flex w-fit my-3 mx-auto'>
                          <p className=' text-sky-500 font-bold'>Total :</p>
                          <p className='font-mono text-slate-500 dark:text-slate-300 ml-3'>{o.total}</p>
                        </div>
                        <p className=' text-sky-600 font-bold text-2xl'>{o.paymentMethod}</p>
                      </div>
                      <div className='flex flex-wrap mb-10'>
                        {o.products.map(p=>{
                          return(
                            <div key={p.id} className='flex flex-col py-6 px-2 w-60 rounded-xl transition-all hover:bg-slate-500 hover:shadow-xl bg-slate-400 dark:bg-transparent dark:hover:shadow-xl dark:hover:border-sky-400 dark:border-slate-400 border my-3 mx-auto relative'>
                              <p className='w-fit ml-4 -mt-4 font-mono text-gray-50 absolute'>{p.currency_id}</p>
                              <p className=' text-sky-500 font-bold'>Nombre :</p>
                              <p className='font-mono text-slate-900 ml-3 dark:text-slate-300'>{p.title}</p>
                              <p className=' text-sky-500 font-bold'>Cantidad :</p>
                              <p className='font-mono text-slate-900 ml-3 dark:text-slate-300'>{p.quantity}</p>
                              <p className=' text-sky-500 font-bold'>Precio Unico :</p>
                              <p className='font-mono text-slate-900 ml-3 dark:text-slate-300'>{p.unit_price}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                : null}
                {showProducts.id !== o.id ?
                  <div key={o.id} onClick={()=>detalleDeCompra(o)} className='bg-white transition-all dark:hover:bg-slate-950 dark:hover:border-slate-950 dark:bg-transparent dark:border-sky-400 border rounded-md mb-5 cursor-pointer hover:shadow-lg dark:hover:shadow-slate-950 flex justify-between'> 
                    <p className='text-slate-500 dark:text-slate-200 py-2 ml-10'>{o.products.length} productos</p>
                    <p className='text-sky-400 dark:text-sky-300 dark:font-mono py-2 mr-10 font-bold'>{o.status}</p>
                  </div>
                : null}
              </div>
              
            )
          })
        : 
          (<div className='bg-white transition-all dark:hover:bg-slate-950 dark:hover:border-slate-950 dark:bg-transparent dark:border-sky-400 border rounded-md mb-5 cursor-pointer hover:shadow-lg dark:hover:shadow-slate-950'> 
            <p className='text-slate-500 py-2'>Ninguno</p>
          </div>)
        }
      </div>
      <div className='w-full md:w-3/5 mx-auto mb-10'>
        <p className='text-sky-400 font-bold my-3'>Comments</p>
        {user.Comments.length > 0 ?
          (<div className='bg-white rounded-md'> 
            <p className='text-slate-500 py-2'>Si ha comentado algo</p>
          </div>)
        : 
          (<div className='flex md:flex-row flex-col justify-center md:justify-between'>
            <div className='bg-white w-10/12 mx-auto md:w-5/12 rounded-lg transition-all dark:hover:bg-slate-950 dark:hover:border-slate-950 dark:bg-transparent dark:border-sky-400 border mb-5 cursor-pointer hover:shadow-lg dark:hover:shadow-slate-950'> 
              <p className='text-slate-500 py-12'>...</p>
            </div>
            <div className='bg-white w-10/12 mx-auto md:w-5/12 rounded-lg transition-all dark:hover:bg-slate-950 dark:hover:border-slate-950 dark:bg-transparent dark:border-sky-400 border mb-5 cursor-pointer hover:shadow-lg dark:hover:shadow-slate-950'> 
              <p className='text-slate-500 py-12'>...</p>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}
