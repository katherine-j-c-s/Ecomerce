import React, { useCallback, useState, useEffect } from 'react'
import Inputs from '../../components/Inputs/Inputs'
import CartProducts from '../../components/CartProducts/CartProducts'
export default function Cart() {
    

    const [saveInfo, setSaveInfo] = useState(false);

    const [payForm, setPayForm] = useState({
        name:'',
        lastName: '',
        dni: '',
        phone: '',
        /*location:'',*/
        email:'amadeo21sept@gmail.com',
        postalCode: '',
        locality: '',
        province: '',
        address: '',
        products: [
            {
                title:'',
                unit_price: '',
                currency_id: '',
                quantity: 0,

            }
        ],
        sentPrice: 0,
        subtotal: 0,
        total: 0,

    })

    const [errors, setErrors] = useState({
        name:'',
        lastName: '',
        dni: '',
        phone: '',
        /*location:'',*/
        email:'amadeo21sept@gmail.com',
        postalCode: '',
        locality: '',
        province: '',
        address: '',
        products: [
            {
                title:'',
                unit_price: '',
                currency_id: '',
                quantity: 0,

            }
        ],
        sentPrice: 0,
        subtotal: 0,
        total: 0,
    })

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
        if(!form.name || form.name.length < 3){
            newErrors.name = "Mínimo 3 carácteres"
        }
        if (!form.lastName || form.lastName.length < 3) {
            newErrors.lastName = "Mínimo 3 caracteres";
        }
        
        if (!form.dni || form.dni.length !== 8) {
            newErrors.dni = "El DNI debe tener 8 caracteres";
        }
        
        if (!form.phone || form.phone.length === 0) {
            newErrors.phone = "Ingrese un número de teléfono";
        }
        
        if (!form.location || form.location.length < 3) {
            newErrors.location = "Ingrese una ubicación";
        }
        
        if (!form.postalCode || form.postalCode.length < 3) {
            newErrors.postalCode = "Ingrese un código postal válido";
        }  
        if (!form.locality || form.locality.length < 3 ) {
            newErrors.locality = "Ingrese una localidad";
        }    
        if (!form.province || form.province.length < 3 ) {
            newErrors.province = "Ingrese una provincia";
        }
        if (!form.address || form.address.length < 3 ) {
            newErrors.address = "Ingrese una dirección";
        }
        setErrors(newErrors)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Acabo de summitear')
    }
    
    useEffect(() => {
        const savedPayForm = localStorage.getItem('payForm');
        if (savedPayForm) {
            setPayForm(JSON.parse(savedPayForm));
            setSaveInfo(true);
        }
    }, []);

    useEffect(() => {
        if (saveInfo) {
            localStorage.setItem('payForm', JSON.stringify(payForm));
        } else {
            localStorage.removeItem('payForm');
        }
    }, [saveInfo, payForm]);
      
    return (
        <div className='w-screen h-screen flex flex-row'>
            <form onSubmit={handleSubmit} className='w-1/2 flex flex-col justify-center text-black items-center bg-white p-32'>  
                <h1 className='mb-12 mt-6 text-[#8D8D8D] text-3xl'>Información de <strong>envío</strong></h1>
                <div className='flex flex-row w-full'>
                    <Inputs title="Nombres"   value={payForm.name} titleWidth="20" inputName="name"     inputPlaceholder="Jean Piere"        handleChange={handleChange} errors={errors} />
                    <Inputs title="Apellidos" value={payForm.lastName} titleWidth="20" inputName="lastName" inputPlaceholder="Pascal Rodriguez"  handleChange={handleChange} errors={errors}/>
                </div>
                <div className='flex flex-row w-full'>
                    <Inputs title="DNI"       value={payForm.dni} titleWidth="16" inputName="dni"       inputPlaceholder="00000000"         handleChange={handleChange} errors={errors}/>
                    <Inputs title="Celular"   value={payForm.phone} titleWidth="20" inputName="phone"     inputPlaceholder="+51 999999999"    handleChange={handleChange} errors={errors}/>
                </div>
                <div className='flex flex-row w-full'>
                    <Inputs title="Ubicación"   value={payForm.location} titleWidth="24" inputName="location"  inputPlaceholder="País / Región"    handleChange={handleChange} errors={errors}/>
                    <Inputs title="Cod. Postal" value={payForm.postalCode} titleWidth="24" inputName="postalCode"   inputPlaceholder="1234"        handleChange={handleChange} errors={errors} />
                </div>
                <div className='flex flex-row w-full '>
                    <Inputs title="Localidad"  value={payForm.locality} titleWidth="24" inputName="locality"     inputPlaceholder="Urb. Santa Maria"            handleChange={handleChange} errors={errors}/>
                    <Inputs title="Provincia"  value={payForm.province} titleWidth="24" inputName="province"     inputPlaceholder="La libertad - Trujillo"      handleChange={handleChange} errors={errors}/>
                </div>
                <Inputs title="Dirección" value={payForm.address} titleWidth="24" inputName="address"  inputPlaceholder="Dirección 1234 - Piso 1 - Depto. A"    handleChange={handleChange} errors={errors}/>
                <div className='flex flex-row w-full justify-center items-center'>
                    <input type='checkbox' className='cursor-pointer' onChange={handleChange}></input>
                    <label className='ml-3 text-[#8D8D8D]'> Guardar información y consultar rápidamente la próxima vez</label>
                </div>

                <button type="submit"  className={Object.keys(errors).length !== 0 ? 'w-1/2 mx-10 my-10 p-4 bg-[#d8d8d8] text-white rounded disabled:opacity-75' :'w-1/2 mx-10 my-10 p-4 bg-cyan-500 text-white rounded'}>Realizar pago</button>
            </form>
            <div className='w-1/2 h-screen flex flex-col bg-[#F7F7F7] p-32 fixed right-0 z-50'>
                <div className='h-2/3 w-full overflow-y-auto'>
                    <CartProducts/>
                    <CartProducts/>
                    <CartProducts/>
                </div>
                <div className='h-[1px] w-full bg-[#8D8D8D] my-6 opacity-70'></div>
                <div className='w-full flex flex-col text-[#8D8D8D]'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span>Subtotal</span>
                        <span><strong>$120.000</strong></span>
                    </div>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span>Envío</span>
                        <span>$120.000</span>
                    </div>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <span><strong>total</strong></span>
                        <span><strong>$120.000</strong></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
