import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardsProduct from './CardsProduct'
import { useSelector } from 'react-redux'


export default function FeaturedSegment() {
    
    const {enhanceProducts} = useSelector(state=> state)
    console.log(enhanceProducts)
    const navigate = useNavigate()
    const go = (ruta) => {
        navigate(ruta)
    }
    const seeDetailsHandler = () => {
        alert('Shoop')
    }
    return (
        <div className='h-[70vh] w-auto flex flex-col justify-center items-center mx-[40px]'>
            <div className='h-auto w-full flex justify-start md:justify-center items-center overflow-x-auto overflow-y-hidden'>
                <div className='flex flex-row gap-4 justify-center items-center'>
                    {enhanceProducts.map((product, index) => {
                        return(
                            <CardsProduct 
                                key={product.id}
                                name={product.name} 
                                price={product.price} 
                                image={product.image[0].url? product.image[0].url : product.image[0] } 
                                addToCart={seeDetailsHandler} 
                                seeDetails={() => go(`/product/${product.id}`)}  
                            />
                        )
                    })}
                </div>
            </div>
        </div>
  )
}
