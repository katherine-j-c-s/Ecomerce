import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById, clearProductDetail } from '../../redux/actions'

export default function Details() {
    const dispatch = useDispatch()
    let {id} = useParams()
    const navigate = useNavigate()
    const detail  = useSelector(state => state.productDetail)

    const [fixedImage, setFixedImage] = useState('')
    const [loadedImage, setLoadedImage] = useState(false)
    const colores = [
        {
            "id": 1,
            "color": "rojo",
            "hex": "#FF0000"
        },
        {
            "id": 2,
            "color": "negro",
            "hex": "#000000"
        },
        {
            "id": 3,
            "color": "blanco",
            "hex": "#FFFFFF"
        },
        {
            "id": 4,
            "color": "gris",
            "hex": "#808080"
        },
        {
            "id": 5,
            "color": "azul",
            "hex": "#0000FF"
        },
        {
            "id": 6,
            "color": "verde",
            "hex": "#008000"
        },
        {
            "id": 7,
            "color": "amarillo",
            "hex": "#FFFF00"
        },
        {
            "id": 8,
            "color": "naranja",
            "hex": "#FFA500"
        },
        {
            "id": 9,
            "color": "beige",
            "hex": "#F5F5DC"
        },
        {
            "id": 10,
            "color": "rosa",
            "hex": "#FFC0CB"
        },
        {
            "id": 11,
            "color": "morado",
            "hex": "#800080"
        },
        {
            "id": 12,
            "color": "cian",
            "hex": "#00FFFF"
        }
    ]
    
    const handleFixedImage = (url) => {
        setFixedImage(url)
    }

   
    useEffect(() => {
        dispatch(getProductById(id))
        return () => {
            dispatch(clearProductDetail())
            setFixedImage('')
        }
    }, [id, dispatch])
    
    useEffect(() => {
        let image = detail.image[0].split('"')
        console.log(image);
        if (image[7] !== undefined) {
            setFixedImage(image[7])
            console.log(fixedImage)
        }else{
            setFixedImage(image[1])
            console.log(fixedImage)
        }
    }, [detail])
    console.log(detail)
    console.log(fixedImage);
  return (
    <div className='h-auto flex flex-col px-4 sm:px-8 lg:px-[60px] mt-10 sm:mt-20'>
        <div className='w-full h-auto flex flex-col sm:flex-row'>
            <div className='basis-[10%] mx-2 sm:mx-10 flex flex-col gap-y-4 sm:gap-y-6'>
                {detail?.image?.filter(image => image !== fixedImage ).map((ima, index) => {
                    let img = ima.split('"')
                    let image = null
                    if (img[7] !== undefined && img[7].length > 2) {
                        image = img[7]
                        console.log(image);
                    }else if(img[7].length === 2){
                        let imga = img[8].slice(0,img[8].length -1)
                        image = imga
                        console.log(image);
                    }else{
                        image = img[1]
                        console.log(image);
                    }
                    return(
                        <img onLoad={()=>setLoadedImage(true)} style={{opacity: loadedImage? 1 : 0, transition: 'opacity 0.3s' }} key={index} onClick={()=> handleFixedImage(image)} className='w- h-32 object-cover cursor-pointer hover:opacity-[.8]' src={image} alt="imagendeProducto" />
                    )
                })}
            </div>
            <div className='basis-[45%] flex justify-center items-center mt-10 sm:mt-0'>
                <img onLoad={()=>setLoadedImage(true)} style={{opacity: loadedImage? 1 : 0, transition: 'opacity 0.3s' }} className='w-full object-cover' src={fixedImage} alt="imagendeProducto" />
            </div>
            <div className='basis-[45%] flex flex-col justify-center items-start ml-2 sm:ml-12 mt-10 sm:mt-0'>
                <div className='flex flex-row text-left text-black font-thin '>
                    <span className='cursor-pointer' onClick={() => navigate('/')}>HOME/</span>
                    <span>PRODUCTS/</span>   
                    <span>DETAIL</span>   
                </div>  
                <h1 className='text-5xl text-left font-bold text-teal-400 '>{detail.name}</h1>
                <h4 className='text-black mt-6 text-left text-2xl'>${detail.price}</h4>
                <div className='h-[1px] opacity-[.4] my-4 w-full bg-black'></div>
                <h3 className='text-black font-thin mt-6 text-left text-2xl mb-6'>Talla</h3>
                <div className='flex flex-row'>
                    <div className='cursor-pointer hover:bg-black flex flex-col h-10 w-10 bg-teal-400 justify-center align-center mx-1'>
                        <h1 className='hover:text-white text-xl ma-0 font-bold text-black opacity-[.4]'>{detail.size}</h1>
                    </div>
                    {/*tallas.map((talla, index) => {
                        return(
                            <div key={index} className='cursor-pointer hover:bg-black flex flex-col h-10 w-10 bg-teal-400 justify-center align-center mx-1'>
                                <h1 className='hover:text-white text-xl ma-0 font-bold text-black opacity-[.4]'>{talla}</h1>
                            </div>
                        )
                    })*/}
                      
                </div>  
                <h3 className='text-black font-thin mt-6 mb-6 text-left text-2xl'>Color</h3>
                <div className='flex flex-row'>
                    <div style={{ backgroundColor: colores.find(item => item.color === detail.color)?.hex }} className={`cursor-pointer flex flex-col h-10 w-10 justify-center align-center mx-1 rounded-full text-black`}></div>

                    {/*colores.map((color, index) => {
                        return(
                            <div key={index} style={{ backgroundColor: color }} className={`cursor-pointer flex  flex-col h-10 w-10 justify-center align-center mx-1 rounded-full`}></div>
                        )
                    })*/}
                      
                </div>  
                <button className='mx-10 my-10 p-4 bg-black text-white rounded'>Agregar al carrito</button>
            </div>

        </div>
        <div className='flex h-auto flex-col w-full my-10'>
            <h2 className='font-bold text-2xl text-black text-start my-6 '>Descripción</h2>
            <span className='text-black text-justify'>{detail.description}</span>
        </div>
    </div>
  )
}
