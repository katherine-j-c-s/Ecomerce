import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import vectorAdd from '../../assets/VectorAdd.png'
import CardsProduct from '../CardsProduct/CardsProduct'
const products = [
  {id:1,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
  {id:2,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
  {id:3,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
  {id:4,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
]

export default function ProductsAdmin() {
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
                image={product.image} 
                addToCart={seeDetailsHandler} 
                seeDetails={() => go(`/product/${product.id}`)}  
            />
          </div>
        )
      })}
    </div>
  )
}
