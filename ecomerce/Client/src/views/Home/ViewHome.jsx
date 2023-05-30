import Home from '../../components/Home/Home';
import CardsProduct from '../../components/CardsProduct/CardsProduct';

//<Home/>
const ViewHome =()=>{
    return(
        <div>
            <Home/>
            <div className='h-[70vh] w-auto'></div>

            <div className='h-[70vh] w-auto'>
                <h2>New styles just arrive</h2>
                <div className='flex flex-row gap-4 justify-center items-center'>
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