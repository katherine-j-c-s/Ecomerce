import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions'
import vectorAdd from '../../assets/VectorAdd.png'
import CardsProduct from '../CardsProduct/CardsProduct'

export default function ProductsAdmin() {
  const dispatch = useDispatch()
  const {products, created} = useSelector(state=> state)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[])
  const navigate = useNavigate()
    const go = (ruta) => {
        navigate(ruta)
    }
    const seeDetailsHandler = () => {
        alert('Shoop')
    }
  return (
    <div className='text-black flex flex-wrap'>
      <Link to={'/admin?pestaña=formProducts'} className=' mx-4 mt-10 w-64 md:w-72 h-72 rounded-lg bg-none border border-gray-500 border-dashed relative shadow hover:shadow-xl'>
        <div className='flex h-full justify-center align-center flex-col'>
          <img className='w-8 h-8 mx-auto' src={vectorAdd} alt="vector" />
          <p className='mt-2'>Agregar</p>
        </div>
      </Link>
      {products.map((product, index) => {
        return(
          <div className='mx-4'>
            <CardsProduct 
                key={product.id}
                name={product.name} 
                price={product.price} 
                image={product.image[0]} 
                addToCart={seeDetailsHandler} 
                seeDetails={() => go(`/product/${product.id}`)}  
            />
          </div>
        )
      })}
    </div>
  )
}
