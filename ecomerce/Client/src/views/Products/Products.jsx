import React, { useState } from 'react'
import CardsProduct from '../../components/CardsProduct/CardsProduct';
import { useNavigate } from 'react-router-dom'
import Accordion from '../../components/Accordion/Accordion';
import image from '../../assets/productHeader.png'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllProducts, getFilters, filterProducts } from '../../redux/actions';

export default function Products() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sizes = useSelector(state => state.sizes)
    const categories = useSelector(state => state.categories)
    const colors = useSelector(state => state.colors)
    const filtros = useSelector(state => state.filtros)

    const go = (ruta) => { navigate(ruta) }

    const products = useSelector(state => {
        if(filtros.length > 0){
            return state.productsFiltered
        }else{
            return state.products
        }
    })
    useEffect(()=>{
        dispatch(getAllProducts())
        if(filtros.length > 0){
            dispatch(filterProducts())
        }
        dispatch(getFilters('sizes'))
        dispatch(getFilters('categories'))
        dispatch(getFilters('colors'))
    },[filtros.length])
    return (
        <div>
            <div className="h-auto w-auto flex justify-center mb-16 relative">
                <img className="object-contain w-full" src={image} alt="atleta corriendo" />
                <h1 className="absolute top-44 left-20 text-white font-thin text-5xl ml-3">Find your</h1>
                <h1 className="absolute top-60 left-20 text-white font-bold text-7xl border-white  px-2">POWER</h1>
            </div>

            <div className="flex flex-row  h-auto my-4 px-[60px] ">
                <div className="w-1/4 h-screen  p-10 flex flex-col items-start justify-start overflow-y-auto">
                    <h1 className="text-black font-extrabold text-2xl text-start mb-10">Filtros</h1>
                    <Accordion
                        options={{
                            title: 'Categoría',
                            name: 'category',
                            items: categories.map(item => item.name)
                        }}
                        isOpen={false}
                        filtros={filtros}

                    />
                    <Accordion
                        options={{
                            title: 'Tallas',
                            name: 'size', 
                            items: sizes.map(item => item.size)
                        }}
                        filtros={filtros}
                        isOpen={false}
                    />
                    <Accordion
                        options={{
                            title: 'Color',
                            name: 'color',
                            items: colors.map(item => item.color)
                        }}
                        isOpen={false}
                        filtros={filtros}

                    />
                </div>
                <div className='w-3/4 h-auto grid-cols-3 gap-2 items-center flex flex-wrap' >
                    {products.map((product, index) => {
                        return(
                            <div key={index} className='flex justify-center'>
                                <CardsProduct 
                                    key={product.id}
                                    name={product.name} 
                                    price={product.price} 
                                    image={product.image?.[0]} 
                                    seeDetails={() => go(`/product/${product.id}`)}  
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
  }
  