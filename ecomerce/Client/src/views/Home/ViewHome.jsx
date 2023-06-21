import { useSelector } from 'react-redux';
import Home from '../../components/Home/Home';

const ViewHome =()=>{
    let {darkModeClient} = useSelector(st=>st)
    return(
        <div className={!darkModeClient ? '' : 'dark'}>
            <Home/>
        </div>
    )
}

export default ViewHome;