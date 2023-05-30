import Home from '../../components/Home/Home';
import CardsProduct from '../../components/CardsProduct/CardsProduct';

//<Home/>
const ViewHome =()=>{
    return(
        <div>
            <Home/>
            <div className='relative'>
                <h2>New styles just arrive</h2>
                <div className='flex flex-row gap-4 justify-center items-center bg-white'>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/>
                    <CardsProduct/>
                </div>
            </div>
            
        </div>
    )
}

export default ViewHome;