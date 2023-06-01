import React from 'react'
import CardsProduct from '../../components/CardsProduct/CardsProduct';
import { useNavigate } from 'react-router-dom'
import Accordion from '../../components/Accordion/Accordion';
import image from '../../assets/productHeader.png'

export default function Products() {
    const navigate = useNavigate()
    const go = (ruta) => {
        navigate(ruta)
    }
    const products = [
        {id:1,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:2,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:3,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:4,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:5,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:6,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:7,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:8,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:9,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:10,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:11,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
        {id:12,name: 'Zapatillas nike negras', price: 1000, image:'https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image-PhotoRoom%207.png?alt=media&token=6ea0c1a8-4f4f-454d-8a01-8358012f4f63&_gl=1*1wkznzv*_ga*MTMyNjgzMDA1LjE2ODAyMzYxMDA.*_ga_CW55HF8NVT*MTY4NTQyNTY3NC4zLjEuMTY4NTQyNTc2My4wLjAuMA..'},
    ]
    return (
        <div>
            <div className="h-auto w-auto flex justify-center mb-16 relative">
                <img className="object-contain w-full" src={image} alt="atleta corriendo" />
                <h1 className="absolute top-44 left-20 text-white font-thin text-5xl ml-3">Find your</h1>
                <h1 className="absolute top-60 left-20 text-white font-bold text-7xl border-white  px-2">POWER</h1>
            </div>

            <div className="flex flex-row  h-auto my-4 px-[60px]">
                <div className="w-1/4 h-screen  p-10 flex flex-col items-start justify-start">
                    <h1 className="text-black font-extrabold text-2xl text-start mb-10">Filtros</h1>
                    <Accordion
                        options={{
                            title: 'Tallas',
                            items: ['XS', 'S', 'M', 'XLL']
                        }}
                        isOpen={false}
                    />
                    <Accordion
                        options={{
                            title: 'Categoría',
                            items: ['Remeras', 'Pantalones', 'Zapatillas', 'Medias']
                        }}
                        isOpen={false}
                    />
                    <Accordion
                        options={{
                            title: 'Colección',
                            items: ['XS', 'S', 'M']
                        }}
                        isOpen={false}
                    />
                    <Accordion
                        options={{
                            title: 'Precio',
                            items: ['XS', 'S', 'M']
                        }}
                        isOpen={false}
                    />
                    <Accordion
                        options={{
                            title: 'Color',
                            items: ['Rojo', 'Azul', 'Verde', 'Negro', 'Naranja']
                        }}
                        isOpen={false}
                    />
                </div>
                <div className='w-3/4 h-auto grid-cols-3 gap-2 items-center flex flex-wrap' >
                    {products.map((product, index) => {
                        return(
                            <div className='flex justify-center'>
                                <CardsProduct 
                                    key={product.id}
                                    name={product.name} 
                                    price={product.price} 
                                    image={product.image} 
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
  