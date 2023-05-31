import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Details() {

    const navigate = useNavigate()
    const [fixedImage, setFixedImage] = useState('')
    const [loadedImage, setLoadedImage] = useState(false)

    const tallas = ['XS','S','L','XL','XXL']
    const colores = ['#111111','#FF0000','#3300FF','#FF00B8']
    const images = [
        'https://th.bing.com/th/id/R.67045ee17437ecab2a79076fe1e33e95?rik=FzhdpQXIb3qA1g&riu=http%3a%2f%2fwww.muenchen.travel%2fvar%2fger_muc%2fstorage%2fimages%2f_aliases%2fteaser_medium%2f5%2f9%2f5%2f8%2f48595-1-ger-DE%2folympiapark-1193-bildsprache-christian-kasper-sm-3000.jpg&ehk=TC0C9UOPr6DEjJnE2sxNQF3G8iRW0AIyap9IrV2nEoM%3d&risl=&pid=ImgRaw&r=0',
        'https://th.bing.com/th/id/OIP.UW0NscnUod6fmFloiiPLsAHaEK?pid=ImgDet&w=740&h=416&rs=1', 
        'https://th.bing.com/th/id/R.7a972f460e44117e0cc7af1cb8a37aa9?rik=T52ukKZDRnTO5g&riu=http%3a%2f%2fveracidadchannel.com%2f_site%2fwp-content%2fuploads%2f2018%2f02%2fdeporte.jpg&ehk=ZACxNU3%2bu9fYkspGyXyIDfpTiNlGuJ3Ax1PYmp5MTgk%3d&risl=&pid=ImgRaw&r=0', 
        'https://th.bing.com/th/id/OIP.yVpyttiWtoW1uAFUClZUaAHaE8?pid=ImgDet&w=1200&h=800&rs=1', 

    ]
    const handleFixedImage = (url) => {
        setFixedImage(url)
    }

    useEffect(()=>{
        setFixedImage(images[0])
    }, [])
  return (
    <div className='h-auto flex flex-col px-[60px] mt-20'>
        <div className='w-full h-auto flex flex-row'>
            <div className='basis-[10%] mx-10 flex flex-col gap-y-6'>
                {images.filter(image => image !== fixedImage ).map((ima, index) => {
                    return(
                        <img onLoad={()=>setLoadedImage(true)} style={{opacity: loadedImage? 1 : 0, transition: 'opacity 0.3s' }} key={index} onClick={()=> handleFixedImage(ima)} className='w- h-32 object-cover cursor-pointer hover:opacity-[.8]' src={ima} alt="imagendeProducto" />
                    )
                })}
            </div>
            <div className='basis-[45%]  flex justify-center align-center'>
                <img onLoad={()=>setLoadedImage(true)} style={{opacity: loadedImage? 1 : 0, transition: 'opacity 0.3s' }} className='w-full object-cover' src={fixedImage} alt="imagendeProducto" />
            </div>
            <div className='basis-[45%] flex flex-col justify-center align-start ml-12'>
                <div className='flex flex-row text-left text-black font-thin '>
                    <span className='cursor-pointer' onClick={() => navigate('/')}>HOME/</span>
                    <span>PRODUCTS/</span>   
                    <span>DETAIL</span>   
                </div>  
                <h1 className='text-5xl text-left font-bold text-teal-400 '>Nombre de producto</h1>
                <h4 className='text-black mt-6 text-left text-2xl'>$1000</h4>
                <div className='h-[1px] opacity-[.4] my-4 w-full bg-black'></div>
                <h3 className='text-black font-thin mt-6 text-left text-2xl mb-6'>Talla</h3>
                <div className='flex flex-row'>
                    {tallas.map((talla, index) => {
                        return(
                            <div key={index} className='cursor-pointer hover:bg-black flex flex-col h-10 w-10 bg-teal-400 justify-center align-center mx-1'>
                                <h1 className='hover:text-white text-xl ma-0 font-bold text-black opacity-[.4]'>{talla}</h1>
                            </div>
                        )
                    })}
                      
                </div>  
                <h3 className='text-black font-thin mt-6 mb-6 text-left text-2xl'>Color</h3>
                <div className='flex flex-row'>
                    {colores.map((color, index) => {
                        return(
                            <div key={index} style={{ backgroundColor: color }} className={`cursor-pointer flex  flex-col h-10 w-10 justify-center align-center mx-1 rounded-full`}></div>
                        )
                    })}
                      
                </div>  
                <button className='mx-10 my-10 p-4 bg-black text-white rounded'>Agregar al carrito</button>
            </div>

        </div>
        <div className='flex h-auto flex-col w-full my-10'>
            <h2 className='font-bold text-2xl text-black text-start my-6 '>Descripción</h2>
            <span className='text-black text-justify'>Diseñado para inspirar una altísima energía e infinitas posibilidades ocultas en el tiempo presente, este gorro piluso es un accesorio urbano con mucho estilo, confeccionado en diferentes colores y texturas suaves pero estructuradas, con cordón elástico ajustable y el clásico logo de Touché en el lateral. Combínalo con el resto de tus prendas deportivas favoritas y úsalo para ir por la ciudad, la playa, o hasta en las montañas</span>
        </div>
    </div>
  )
}
