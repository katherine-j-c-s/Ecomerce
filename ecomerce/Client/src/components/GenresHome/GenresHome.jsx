import image1 from '../../assets/image-PhotoRoom1.png'
import image2 from '../../assets/image-PhotoRoom4.png'
import image3 from '../../assets/image-PhotoRoom6.png'
import CardGenres from '../CardG/CardG'

const genres = [
    {
        title:'Mujeres',
        desc:'tenemos productos para Mujeres',
        image: image1
    },{
        title:'Hombres',
        desc:'tenemos productos para Hombres',
        image: image2
    },{
        title:'Niños',
        desc:'tenemos productos para Niños',
        image: image3
    }
]

const GenresHome = ()=>{
    return (
        <div className='w-full text-center mt-12 md:text-left'>
            <h1 className='text-2xl font-bold dark:text-slate-200 text-black md:ms-32'>Nuestros Productos son para:</h1>
            <div className='flex justify-evenly mt-20 text-center flex-col md:flex-row'>
                {genres.map(g=>{
                    return(
                        <CardGenres 
                            key={g.title}
                            title={g.title}
                            desc={g.desc}
                            img={g.image}
                        />
                    )
                })}
            </div>
            
        </div>
    )
}
export default GenresHome;