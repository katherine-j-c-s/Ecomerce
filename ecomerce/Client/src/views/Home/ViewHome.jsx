import Home from '../../components/Home/Home';
import FeaturedSegment from '../../components/CardsProduct/FeaturedSegment';


//<Home/>
const ViewHome =()=>{
    
    return(
        <div>
            <Home/>
            <div className='h-[60vh] w-auto'></div>
            <FeaturedSegment/>
            
            
        </div>
    )
}

export default ViewHome;