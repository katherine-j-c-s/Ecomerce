import image1 from '../../images/image-PhotoRoom1.png'
import image2 from '../../images/image-PhotoRoom4.png'
import image3 from '../../images/image-PhotoRoom6.png'
import CardGenres from '../CardG/CardG'

const genres = [
    {
        title:'Women',
        desc:'here are all the products related to the women',
        image: image1
    },{
        title:'Men',
        desc:'here are all the products related to the men',
        image: image2
    },{
        title:'Kids',
        desc:'here are all the products related to the kids',
        image: image3
    }
]

const GenresHome = ()=>{
    return (
        <div className='w-full text-left mt-12'>
            <h1 className='text-2xl font-bold'>Categorizes</h1>
            <div className='flex justify-evenly mt-20 text-center'>
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