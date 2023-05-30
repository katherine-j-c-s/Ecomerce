import Home from '../../components/Home/Home';
import CardsProduct from '../../components/CardsProduct/CardsProduct';

//<Home/>
const ViewHome =()=>{
    return(
        <div>






            {/* Bloque de cards*/}

            <div className='h-screen w-screen'>
                <div className='h-full w-full flex flex-row gap-4 justify-center items-center bg-white'>
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