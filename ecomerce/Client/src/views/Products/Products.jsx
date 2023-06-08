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
        <div >
            <div className="h-auto w-auto flex justify-center mb-16 relative">
                <img className="object-cover w-full md:h-auto h-96 " src={image} alt="atleta corriendo" />
                <h1 className="absolute top-44 left-20 text-white font-thin text-5xl ml-3">Find your</h1>
                <h1 className="absolute top-60 left-20 text-white font-bold text-7xl border-white  px-2">POWER</h1>
            </div>

            <div className="flex flex-col lg:flex-row  h-auto my-4 px-4 lg:px-[60px] ">
                <div className="w-full lg:w-1/4 h-auto lg:h-[80vh] p-4 lg:p-10 flex flex-col items-start justify-start overflow-y-auto mb-4 lg:mb-0">
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
                <div className='w-full lg:w-3/4 h-auto grid grid-cols-1 lg:grid-cols-3 gap-2 items-center flex-wrap' >
                    {products.map((product, index) => {
                        let imgAdded = product.image.map(img =>{
                            let imgs = img.split('"')
                            if(imgs[7] !== undefined){
                                return imgs[7]
                            }else {
                                return imgs[1]
                            }
                        })
                        return(
                            <div key={index} className='flex justify-center'>
                                <CardsProduct 
                                    key={product.id}
                                    name={product.name} 
                                    price={product.price} 
                                    image={imgAdded[0] !== undefined ? imgAdded[0] : product.image?.[0]} 
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
