import React, { useEffect, useState } from 'react'

import katheImg from '../../assets/kathe.png'
import AmadeoImg from '../../assets/amadeo.png'
import PabloImg from '../../assets/Pablo.png'
import AgusImg from '../../assets/agus.png'
import joseImg from '../../assets/Jose.png'
import GinoImg from '../../assets/Gino.png'

import icons1 from '../../assets/weightlifting.png'
import icons2 from '../../assets/piano.png'
import icons3 from '../../assets/cat.png'
import icons4 from '../../assets/game-controller.png'
import icons5 from '../../assets/hiking.png'
import icons6 from '../../assets/listen.png'
import icons7 from '../../assets/car.png'
import icons8 from '../../assets/popcorn.png'
import { useSelector } from 'react-redux';






const participantes = [
    {
        name:'Katherine',
        desc: 'Hola, soy Katherine Contreras. Nací en Venezuela estado Bolivar. actualmente vivo en Argentina Neuquen. Soy adicta al gym💪, tocar el piano me ayudar a relajerme😅. ',
        image: katheImg,
        icons: [icons1,icons2]
    },{
        name:'Amadeo',
        desc: 'Hi👋🏻, soy Amadeo Flores. Soy de Perú  y vivo en la ciudad de Trujillo. Me gustan muchos los videojuegos y tengo 2 gatitos 🐱.',
        image: AmadeoImg,
        icons: [icons3,icons4]
    },
    {
        name:'Agustin',
        desc: 'Hola! Soy Agustín Andrada, de Santa Fe, Argentina. Soy un scout amante de escalar, el Trekkinn, canotaje. También me encantan los videojuegos y la música.',
        image: AgusImg,
        icons: [icons5,icons6]
    },
    {
        name:'Pablo',
        desc: 'Soy Pablo de Argentina. amo la música, los deportes . y me apasiona el desarrollo web, la tecnología y los videojuegos 🤓',
        image: PabloImg,
        icons: [icons4,icons6]
    },{
        name:'Jose',
        desc: 'Hola, soy Jose Montaño, de Caracas, Venezuela. me encantan los juegos competitivos y los autos',
        image: joseImg,
        icons: [icons4,icons7]
    },{
        name:'Gino',
        desc: 'Hola, soy Gino nací en Bucaramanga, Colombia . me gusta los videojuegos. ir al cine y el  gimnasio 💪🏻',
        image: GinoImg,
        icons: [icons4,icons8]
    }
]

export default function About() {
    let [inicio,setInicio] = useState(false)
    let {darkModeClient} = useSelector(st=>st)
    useEffect(()=>{
        setTimeout(()=>{
            setInicio(true)
        },100)
    })
  return (
    <main  className={!darkModeClient ? '' : 'dark bg-slate-950'}>
        <div className='w-full pt-32 md:pt-20'>
            {/* <div className='text-slate-900 dark:text-slate-200 md:text-3xl text-xl font-bold mb-10'>
                <Typewriter onInit={(typewriter)=> {
                typewriter.typeString("Nosotros somos...")
                .pauseFor(1000)
                .deleteAll()
                .typeString("El grupo Super Genial!! 😎")
                .start();
                }}
                />
            </div> */}
            <h1  className='text-slate-900 dark:text-slate-200 md:text-3xl text-xl font-bold mb-10'>Nosotros somos...</h1>
            <div className='w-10/12 flex justify-center mx-auto flex-col'>
                {participantes.map((p,i)=>{
                    let impart = false
                    if (i == 1 || i == 3 || i == 5) {
                        impart = true
                    }
                    let text = p.desc.split('. ')
                    return(
                    <div key={i} className={`justify-center md:px-32 mx-auto flex w-full`}>
                        <div className={`flex flex-col md:flex-row h-fit md:w-fit w-full shadow-lg dark:shadow-black shadow-slate-950 ${inicio === true ? `${impart === true ? 'md:translate-x-44' : 'md:-translate-x-44'}` : null}  relative z-0 transition-all mb-10 bg-slate-300 dark:bg-slate-600 py-6 px-10 rounded-xl`}>
                            <img className='md:h-32 md:w-32 mx-auto mr-10 rounded-full' src={p.image} alt="img" />
                            <div className='flex md:w-96 w-full md:ml-5 flex-col h-fit  text-slate-700'>
                                <p className='font-bold text-xl mb-2 mt-5 md:mt-0 md:text-start dark:text-sky-400 text-center'>{p.name}</p>
                                <div className='w-full md:text-left dark:text-slate-200 font-mono text-center'>
                                    {text.map(t=>(
                                        <p>{t}</p>
                                    ))}
                                </div>
                            </div> 
                            <div className={`absolute top-0 ${impart === true ? 'right-0' : 'left-0'}`}> 
                                <div className='relative flex z-10'>
                                    {p.icons.map((icon ,index)=> (
                                        <img className={`w-10 h-10 ${index == 0 && impart === false ? 'mt-10 mr-2' : ''}${index == 1 && impart === true ? 'mt-10 mr-2' : ''}`} src={icon} alt="icon" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    </main>
  )
}
