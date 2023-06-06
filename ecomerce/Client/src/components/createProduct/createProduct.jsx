import React from 'react'
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/actions';
import { useState } from 'react';
import vectorAdd from '../../assets/VectorAdd.png'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;
const options= [
    {
        title: 'Categoría',
        items:['remeras', 'pantalones', 'calzado', 'calzas', 'buzos', 'shorts', 'trajes de baño', 'medias', 'accesorios', 'gorras']
    },
    {
        title: 'Tallas',
        items:['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
    },
    {
        title: 'Color',
        items:[
            {name:'rojo',class:'bg-red-500'},
            {name:'negro',class:'bg-black'},
            {name:'blanco',class:'bg-white border border-black'},
            {name:'gris',class:'bg-slate-600'},
            {name:'azul',class:'bg-blue-800'},
            {name:'verde',class:'bg-lime-700'},
            {name:'amarillo',class:'bg-yellow-400'},
            {name:'naranja',class:'bg-orange-500'},
            {name:'beige',class:'bg-orange-300'},
            {name:'rosa',class:'bg-rose-300'},
            {name:'morado',class:'bg-indigo-800'},
            {name:'cian',class:'bg-blue-400'}
        ]
    }
]

const CreateProduct = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ready,setReady] = useState(true)

    const [addImg, setAddImg] = useState(false)
    const [validateImg, setvalidateImge] = useState({ready:false,message:'Debe ser un url'})

    const [showType, setShowTypes]= useState(false)
    const [readyType, setReadyType] = useState(false)

    const [color,setColor] = useState('')
    const [talla,setTalla] = useState('')
    
    const [img, setImg] = useState('')
    const [type, setType] = useState({
        id:0,
        color:'',
        talla:'',
        cantidad:1,
    })
    const [inputs, setInputs] = useState({
        nombre: "",
        desc: "",
        precio: null,
        categoria:"",
        imagenes: [],
        type:[]
    });
    const [errors, setErrors] = useState({
        nombre: "",
        desc: "",
        precio: null,
        categoria:"",
        img:"",
    });
    function addImage() {
        if (validateImg.ready === true) {
            setImg('')
            setAddImg(false)
            inputs.imagenes.push(img)
            setvalidateImge({...validateImg,ready:false})
        }
    }
    function editType(e) {
        let allProps = e.target.id.split(',')
        console.log(allProps);
        setType({
            id:Number(allProps[0]),
            color:allProps[1],
            talla:allProps[2],
            cantidad:Number(allProps[3]),
        })
        setShowTypes(true)
        setReadyType(true)
    }
    function deleteType(e) {
        let id = e.target.id
        let newlist = inputs.type.filter(t=> t.id !== Number(id))
        setInputs({...inputs, type:newlist})
    }
    function validate(inputs) {
        const errors = {};
        if (inputs.nombre === '') {
            errors.nombre = "Debe tener un nombre";
        }else if (!inputs.desc) {
            errors.desc = "Debe tener una descripcion";
        }else if (!inputs.precio) {
            errors.precio = "Debe tener precio";
        }else if (isNaN(inputs.precio)) {
            errors.precio = "Debe ser numerico";
        }else if (!inputs.categoria) {
            errors.categoria = "Debe escojer una categoria";
        }else if (inputs.type.length === 0) {
            errors.details = "Debe agregar el detalle del producto";
        }
        return errors;
    }
    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
            ...inputs,
            [e.target.name]: e.target.value,
            })
        );
    }
    function handleimagenes(e) {
        let img = e.target.value
        setImg(e.target.value)
        if (reguexURL.test(img)) {
            setvalidateImge({...validateImg,ready:true})
            setErrors(validate({...inputs}))
            setReady(true)
        }
    }
    function handleColors(e) {
        setColor(e.target.id)
        setType({
            ...type,
            color: e.target.id,
        });
        if (type.talla !== '') {
            setReadyType(true)
        }
    }
    function handleTalla(e) {
        setTalla(e.target.id)
        setType({
            ...type,
            talla: e.target.id,
        });
        if (type.color !== '') {
            setReadyType(true)
        }
    }
    function handleCantidad(e) {
        if (e.target.id === 'menos') {
            if (type.cantidad > 1) {
                setType({
                    ...type,
                    cantidad: --type.cantidad,
                });
            }
        }
        if (e.target.id === 'mas') {
            setType({
                ...type,
                cantidad: ++type.cantidad,
            });
        }
    }
    function handleType(e) {
        let repetido = inputs.type.find(t=> t.id === type.id)
        console.log(type);
        if (repetido !== undefined) {
            let newList = inputs.type.filter(t => t.id !== type.id)
            newList.push(type)
            setInputs({...inputs, type:newList})
            setErrors(validate(inputs))
        }else if (!repetido){
            inputs.type.push(type)
            setErrors(validate(inputs));
        }
        setType({
            id:type.id + 1,
            color:'',
            talla:'',
            cantidad:1,
        })
        setColor('')
        setTalla('')
        setReadyType(false)
        setShowTypes(false)
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (inputs.imagenes.length === 0) {
            setReady(false)
            setErrors({...errors, img: 'debe agregar imagenes del producto'})
        }
        if (Object.keys(errors).length === 0 && inputs.type.length > 0) {
            dispatch(addProduct(inputs))
            setInputs({
                nombre: "",
                desc: "",
                precio: 0,
                categoria:"",
                imagenes: [],
                type:[]
            });
              setErrors({
                nombre: "",
                desc: "",
                precio: null,
                categoria:"",
                img:"",
            });
            setReady(true)
            swal("Producto Creado", "Exitosamente!", "success");
            navigate("/admin?pestaña=productos");
        }else{
            setReady(false)
        }
    }
    return(
    <div className='relative w-full'>
        <div className="text-black" >
            <Link className='absolute right-8 top-6 text-cyan-400' to={'/admin?pestaña=productos'}>
                <p>Go Back</p>
            </Link>
            <div className='mt-2 w-full'>
                <h2 className='mt-20 text-xl font-bold mb-10 mx-auto pb-2 w-32 border-b-4 border-cyan-400'>Agregar</h2>
                <form className='flex flex-col items-center w-full justify-center' onSubmit={handleSubmit}>
                    <div className='flex w-full justify-center align-middle'>
                        <div className='w-4/5 flex flex-col justify-center align-middle mx-auto'>
                            <div className='flex align-middle flex-col md:flex-row justify-center w-full'>
                                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                                    <label className={`absolute w-16 bg-slate-300 h-fit left-8  ${errors.nombre && ready === false ? 'bottom-14 md:bottom-16 text-red-500' : 'bottom-10 text-cyan-400'}`}>Nombre</label>
                                    <input
                                        className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.nombre  && ready === false ? 'border-red-500  focus:border-red-500' : 'border-grey focus:border-cyan-500 hover:border-cyan-500'}`} 
                                        name="nombre"
                                        value={inputs.nombre}
                                        onChange={handleChange}
                                        placeholder="Zapatillas Nike"
                                    ></input>
                                    {ready === false ?
                                        <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.nombre}</p>
                                    :null}
                                </div>
                                <div className='flex mb-5 flex-col justify-center w-full md:w-fit relative'>
                                    <label className={`absolute w-16 bg-slate-300 h-fit left-8  ${errors.precio && ready === false ? 'bottom-16 text-red-500' : 'bottom-10 text-cyan-400'}`}>Precio</label>
                                    <input
                                        className={`placeholder-slate-400 focus:outline-none hover:shadow-md my-2 border bg-transparent rounded-md w-full md:w-fit p-2 pl-10 text-grey ${errors.precio && ready === false ? 'border-red-500  focus:border-red-500' : 'border-grey focus:border-cyan-500 hover:border-cyan-500'}`} 
                                        name="precio"
                                        value={inputs.precio}
                                        onChange={handleChange}
                                        placeholder="$599"
                                    ></input>
                                    {ready === false ?
                                        <p className='text-red-500 relative bottom-2'>{errors.precio}</p>
                                    :null}
                                </div>
                            </div>
                            <div className='flex justify-center w-full'>
                                <div className='w-full md:w-8/12 flex flex-col justify-center relative'>
                                    <label  className={`absolute w-24 bg-slate-300 h-fit left-8  ${errors.desc && ready === false ? 'bottom-20 text-red-500' : 'bottom-16 text-cyan-400'}`}>Descripcion</label>
                                    <textarea
                                        className={`placeholder-slate-400 focus:outline-none hover:shadow-md md:m-2 border bg-transparent rounded-md p-2 pl-10 text-grey ${errors.desc && ready === false ? 'border-red-500  focus:border-red-500' : 'border-grey focus:border-cyan-500 hover:border-cyan-500'}`} 
                                        name="desc"
                                        value={inputs.desc}
                                        onChange={handleChange}
                                        placeholder="loren input black..."
                                    ></textarea>
                                    {ready === false ?
                                        <p className='text-red-500 relative bottom-0 md:bottom-2'>{errors.desc}</p>
                                    :null}
                                </div>
                            </div>
                            <div className='flex flex-col-reverse md:flex-row justify-center w-full'>
                                <div className={`${errors.details && ready === false ? 'border-red-500 hover:border-red-500 text-red-500 hover:text-red-500' : 'border-grey hover:border-cyan-500 text-slate-400 hover:text-slate-700'} flex w-fit border hover:shadow-md rounded-lg p-2 transition-all`}>
                                    <p className='px-3'>Detalles:</p>
                                    <img className='w-5 h-5 top-1 mr-2 relative mx-auto' onClick={()=> setShowTypes(true)} src={vectorAdd} alt="vector" />
                                </div>
                                <div className='w-full md:w-fit md:ml-4'>
                                    <select className={`${errors.categoria && ready === false ? 'hover:border-red-500 focus:border-red-500 border-red-500 text-red-500 focus:text-red-500' : 'hover:border-cyan-500 focus:border-cyan-500 border-grey text-grey focus:text-slate-800'} bg-transparent border hover:shadow-md focus:outline-none w-full my-5 md:my-0 md:w-fit rounded-md py-2`} onChange={handleChange} name="categoria" defaultValue={'DEFAULT'}>
                                        <option value="DEFAULT" disabled='true'>
                                            {options[0].title}
                                        </option>
                                        {options[0].items.map(i=>(
                                            <option value={i}>{i}</option>
                                        ))}
                                    </select>
                                    {ready === false ?
                                        <p className='text-red-500 relative bottom-0'>{errors.categoria}</p>
                                    :null}
                                </div>
                            </div>  
                            <div className='w-full flex flex-col align-middle mt-2 justify-start'>
                                {inputs.type.map(t=>{
                                    console.log();
                                    let color = options[2].items.find(c=> c.name === t.color)
                                    return(
                                        <div key={t.id} className='flex bg-gray-200 py-2 mt-2 rounded-lg justify-evenly'>
                                            <div className='flex'>
                                                <div className={`relative z-10 h-8 w-8 rounded-3xl mr-3 ${color.class}`}></div>
                                                <p className='md:text-black text-white md:relative absolute'>{t.color}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='md:text-black text-white md:relative absolute'>talla:</p>
                                                <p className='relative z-10 text-black'>{t.talla}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='md:text-black text-white md:relative absolute'>Cantidad:</p>
                                                <p className='relative z-10'>{t.cantidad}</p>
                                            </div>
                                            <div>
                                                <ul className="flex flex-row items-center gap-2">
                                                    <li className='relative z-10' onClick={editType}>
                                                        <button type='reset' id={`${t.id},${t.color},${t.talla},${t.cantidad}`} className="p-1.5 bg-bluey rounded-full">
                                                            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" >
                                                                <path d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                                                            </svg>
                                                        </button>
                                                    </li>
                                                    <li onClick={deleteType}>
                                                        <button type='reset' id={t.id} className="p-1.5 border-bluey rounded-full"> 
                                                            <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                                                                <path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                                                            </svg>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })}
                                {showType === true ?  
                                    <div className='flex flex-col justify-center h-fit w-full'>
                                        {readyType === true ? 
                                            <div className='flex relative w-fit mt-6 mx-auto justify-center'>
                                                <p className='text-cyan-400 bottom-9 md:bottom-6 left-0 h-fit w-20 z-10 absolute bg-slate-300'>Cantidad</p>
                                                <div className='flex justify-center border rounded-lg border-slate-400'>
                                                    <p id='menos' className='mx-8 py-1 md:py-0 md:mx-4 text-2xl text-slate-600 hover:text-slate-900 transition-all' onClick={handleCantidad}>-</p>
                                                    <p className='mt-1 text-xl'>{type.cantidad}</p>
                                                    <p id='mas' className='mx-8 py-1 md:py-0 md:mx-4 text-2xl text-slate-600 hover:text-slate-900 transition-all' onClick={handleCantidad}>+</p>
                                                    <div onClick={handleType} className='h-full w-full pt-1 px-4 bg-cyan-400 text-slate-800 hover:text-black hover:font-bold transition-all rounded-r-lg'>
                                                        <p>Listo!</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        :null}
                                        <div className='flex md:flex-row flex-col justify-center align-middle'>
                                            <div className='w-full md:w-3/5'>
                                                <p className='w-full my-4'>{options[2].title}</p>
                                                <div className='w-full flex flex-wrap justify-center'>
                                                    {options[2].items.map(i=>{
                                                        return(
                                                        <p onClick={handleColors}id={i.name} className={`text-black w-fit rounded-lg p-2 m-2 hover:bg-sky-300 transition-all flex ${i.name === color ? ' bg-sky-300' : 'bg-slate-400'}`} >{i.name}</p>
                                                    ) 
                                                    })}
                                                </div>
                                            </div>
                                            <div className='w-full md:w-2/5'>
                                                <p className='w-full my-4'>{options[1].title}</p>
                                                <div className='w-full flex flex-wrap justify-center'>
                                                    {options[1].items.map(i=>{
                                                        return(
                                                            <p onClick={handleTalla} id={i} className={`text-black w-fit rounded-lg p-2 px-4 m-2 hover:bg-sky-300 transition-all flex ${i === talla ? ' bg-sky-300' : 'bg-slate-400'}`}>{i}</p>
                                                    ) 
                                                    })}
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                : null}
                                {ready === false ?
                                    <p className='text-red-500 relative bottom-0'>{errors.details}</p>
                                :null}
                            </div>                  
                            <div className='flex align-middle justify-center w-full'>
                                <div className='flex mt-6 flex-col mx-auto justify-center'>
                                    <div className={`flex w-fit ${errors.img ? 'border-red-500 hover:bor00 text-red-500 hover:text-red-500' : 'border-grey hover:border-cyan-500 text-slate-400 hover:text-slate-700'} border hover:shadow-md rounded-md p-2 mx-auto transition-all`} onClick={()=>{setAddImg(true)}}>
                                        <p className='px-3'>Imagenes</p>
                                        <img className='w-5 h-5 top-1 mr-2 relative mx-auto' src={vectorAdd} alt="vector" />
                                    </div>
                                    {ready === false ?
                                    <p className='text-red-500 relative bottom-0'>{errors.img}</p>
                                    :null}
                                    {addImg ?
                                        <div className='flex '>
                                        <input
                                            className='placeholder-slate-400 hover:border-cyan-500 hover:shadow-md focus:outline-none focus:border-cyan-500 md:m-2 border border-grey bg-transparent rounded-md p-2 pl-10 text-grey'
                                            name="img"
                                            value={img.url}
                                            onChange={handleimagenes}
                                            placeholder="url"
                                        ></input>
                                        {validateImg ?
                                            <p className='h-fit relative top-2 hover:shadow-lg text-slate-600 py-2 px-6 rounded-md bg-bluey capitalize hover:font-bold' onClick={addImage}>Add</p>
                                        :null}
                                    </div>: null}
                                </div> 
                            </div>
                            <div className='flex justify-center md:flex-row flex-col'>
                                {inputs.imagenes.length !== 0 ? 
                                    inputs.imagenes.map(img=>{
                                        return(
                                            <div className='mx-auto md:mx-4 mt-4 md:mt-1 w-60 md:w-60 h-60 rounded-lg bg-none border border-gray-500 border-dashed relative shadow hover:shadow-xl'>
                                                <img src={img} alt="imagen" />
                                            </div>
                                        )
                                    })
                                : null}
                            </div>
                        </div>
                    </div>
                    <button className='bg-cyan-400 my-12' type="submit">Crear Producto</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default  CreateProduct;