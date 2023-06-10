import React, { useCallback, useState, useEffect } from 'react'
import Inputs from '../../components/Inputs/Inputs'
import CartProducts from '../../components/CartProducts/CartProducts'
import axios from 'axios'
import Flags from '../../components/Flags/Flags'
import {useSelector} from 'react-redux'
export default function Cart() {
    
    const productsCart = useSelector(state => state.sideBarCar)
    const [saveInfo, setSaveInfo] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const toggleIsOpen = () => setIsOpen(prevState => !prevState)
    
    const [payForm, setPayForm] = useState({
        first_name:'',
        last_name: '',
        dni: 0,
        address: '',
        phone: '',
        postal: '',
        locality: '',
        currency_id: '',
        

    })

    const [errors, setErrors] = useState({
        first_name:'',
        last_name: '',
        dni: 0,
        phone: '',
        postal: '',
        address: '',
        locality: '',
        currency_id: '',
    })

    const handleCountrySelect = (option) => {
        setPayForm(prevState => ({
          ...prevState,
          locality: option.label,    
          currency_id: option.value,  
          phone: option.codigoPais + prevState.phone 
        }));
      }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setSaveInfo(checked);
        } else {
            let newPayForm = { ...payForm, [name]: value };
            validate(newPayForm);
            setPayForm(newPayForm);
        }
    }

    const validate = useCallback(form => {
        let  newErrors = {}
        if(!form.first_name || form.first_name.length < 3){
            newErrors.first_name = "Mínimo 3 carácteres"
        }
        if (!form.last_name || form.last_name.length < 3) {
            newErrors.last_name = "Mínimo 3 caracteres";
        }
        
        if (!form.dni || form.dni < 0 ) {
            newErrors.dni = "El DNI debe tener 8 caracteres";
        }
        
        if (!form.phone || form.phone.length === 0) {
            newErrors.phone = "Ingrese un número de teléfono sin codigo de país";
        }
        
        if (!form.postal || form.postal.length < 3) {
            newErrors.postal = "Ingrese un código postal válido";
        }  
        
        if (!form.address || form.address.length < 3 ) {
            newErrors.address = "Ingrese una dirección";
        }
        if (!form.locality) {
            newErrors.locality = "Seleccione un país";
        }
        
        if (!form.currency_id) {
            newErrors.currency_id = "Seleccione un país";
        }
        
        setErrors(newErrors)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const arraytest = {...payForm, products: productsCart.products, total: productsCart.total}
        console.log("array a enviar",JSON.stringify(arraytest))
        axios.post('/payment/create-order', JSON.stringify(arraytest), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => console.log(res))
        .catch(err => {
            console.log(err.response);  // Esto imprimirá la respuesta del error.
        });
    }
    
    
    useEffect(() => {
        const savedPayForm = localStorage.getItem('payForm');
        if (savedPayForm) {
            const parsedSavedPayForm = JSON.parse(savedPayForm);
            setPayForm(parsedSavedPayForm);
            validate(parsedSavedPayForm);
            setSaveInfo(true);
        }
    }, []);

    useEffect(() => {
        if (saveInfo) {
            const payFormWithTotal = { ...payForm, total: productsCart.total, products: productsCart.products, dni: Number(payForm.dni) };
            localStorage.setItem('payForm', JSON.stringify(payFormWithTotal));
        } else {
            localStorage.removeItem('payForm');
        }
    }, [saveInfo, payForm, productsCart.total]);
    
      
    return (
        <div className='w-screen h-screen flex flex-row'>
            <form onSubmit={handleSubmit} className='md:w-1/2 md:mt-[20px] mt-[10%] md:h-auto h-fit w-full flex flex-col justify-center text-black items-center bg-white md:p-32 p-4'>  
                <div className='md:hidden block mb-12'>
                    <button onClick={toggleIsOpen}  type="button" className=" bg-[#31B5FF] rounded-l-full text-white w-30 flex flex-row justify-center items-center absolute right-0"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-2 mr-2'>
                            <path fill="currentColor" d="M34.52 239.03L228.87 44.677c9.373-9.373 24.57-9.373 33.941 0l22.667 22.667c9.356 9.357 9.375 24.522.04 33.901l-154.02 154.02 154.02 154.021c9.335 9.379 9.316 24.544-.04 33.901l-22.667 22.667c-9.373 9.373-24.569 9.373-33.941 0L34.52 272.97c-9.373-9.373-9.373-24.569 0-33.94z"/>
                        </svg>
                        ${productsCart.total}
                    </button>
                </div>
                <h1 className='mb-12 mt-6 text-[#8D8D8D] text-3xl'>Información de <strong>envío</strong></h1>
                <div className='flex md:flex-row flex-col w-full'>
                    <Inputs title="Nombres"   value={payForm.first_name} titleWidth="20" inputName="first_name"     inputPlaceholder="Jean Piere"        handleChange={handleChange} errors={errors} />
                    <Inputs title="Apellidos" value={payForm.last_name} titleWidth="20" inputName="last_name" inputPlaceholder="Pascal Rodriguez"  handleChange={handleChange} errors={errors}/>
                </div>
                <div className='flex md:flex-row flex-col w-full'>
                    <Inputs title="DNI"       value={payForm.dni} titleWidth="16" inputName="dni"  type="number"     inputPlaceholder="00000000"         handleChange={handleChange} errors={errors}/>
                    <Inputs title="Celular"   value={payForm.phone} titleWidth="20" inputName="phone"     inputPlaceholder="999999999"    handleChange={handleChange} errors={errors}/>
                </div>
                <Inputs title="Dirección" value={payForm.address} titleWidth="24" inputName="address"  inputPlaceholder="Dirección 1234 - Piso 1 - Depto. A"    handleChange={handleChange} errors={errors}/>
                <div className='flex md:flex-row flex-col w-full'>
                    <Inputs title="Cod. Postal" value={payForm.postal} titleWidth="24" inputName="postal"   inputPlaceholder="1234"        handleChange={handleChange} errors={errors} />
                    <Flags onSelect={handleCountrySelect} errors={errors}/>    
                </div>

                <div className='flex md:flex-row flex-row w-full md:justify-center md:items-center justify-start items-center'>
                    <input type='checkbox' className='cursor-pointer' onChange={handleChange}></input>
                    <label className='ml-3 text-[#8D8D8D] md:text-center text-start'> Guardar información y consultar rápidamente la próxima vez</label>
                </div>
                <button type="submit"  className={Object.keys(errors).length !== 0 ? 'md:w-1/2 w-full mx-10 my-10 p-4 bg-[#d8d8d8] text-white rounded disabled:opacity-75' :'md:w-1/2 w-full mx-10 my-10 p-4 bg-cyan-500 text-white rounded'}>Realizar pago</button>
            </form>
            {isOpen && <div className='md:hidden block w-full h-screen flex flex-col bg-[#F7F7F7] md:pt-32 pt-20 md:px-20 px-10 fixed right-0 z-50'>
                <div
                    className="absolute z-30 text-cyan-600 top-10 right-10 cursor-pointer hover:scale-150 hover:text-teal-400"
                    onClick={toggleIsOpen}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </div>
                <div className='h-2/3 w-full overflow-y-auto'>
                    {productsCart.products.map((product, index) =>{
                        return(
                            <CartProducts key={index} image={product.image} price={product.price} quantity={product.quantity} name={product.name}/>
                        )
                    })}
                </div>
                <div className='h-[1px] w-full bg-[#8D8D8D] my-6 opacity-70'></div>
                <div className='h-1/3 w-full flex flex-col text-[#8D8D8D]'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span><strong>total</strong></span>
                        <span><strong>${productsCart.total}</strong></span>
                    </div>
                </div>
            </div>}
            {<div className='hidden md:block md:w-1/2 w-full h-screen flex flex-col bg-[#F7F7F7] md:pt-32 pt-20 md:px-20 px-10 fixed right-0 z-50'>
                <div className='h-2/3 w-full overflow-y-auto'>
                    {productsCart.products.map((product, index) =>{
                        return(
                            <CartProducts key={index} image={product.image} price={product.price} quantity={product.quantity} name={product.name}/>
                        )
                    })}
                </div>
                <div className='h-[1px] w-full bg-[#8D8D8D] my-6 opacity-70'></div>
                <div className='h-1/3 w-full flex flex-col text-[#8D8D8D]'>
                    
                    
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span><strong>total</strong></span>
                        <span><strong>${productsCart.total}</strong></span>
                    </div>
                </div>
            </div>}
        </div>
    )
}
