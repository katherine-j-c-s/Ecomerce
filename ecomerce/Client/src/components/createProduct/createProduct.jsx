import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/actions';
import { useState } from 'react';
import vectorAdd from '../../assets/VectorAdd.png'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;

const CreateProduct = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ready,setReady] = useState(true)

    const [addImg, setAddImg] = useState(false)
    const [validateImg, setvalidateImge] = useState({ready:false,message:'Debe ser un url'})

    const [showType, setShowTypes]= useState(false)
    const [readyType, setReadyType] = useState(false)
    
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
        genero: "",
        imagenes: [],
        type:[]
    });
    const [errors, setErrors] = useState({
        nombre: "",
        desc: "",
        precio: null,
        categoria:"",
        genero: "",
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
        if (!inputs.nombre) {
            errors.email = "Debe tener un nombre";
        }else if (!inputs.desc) {
            errors.desc = "Debe tener una descripcion";
        }else if (!inputs.precio) {
            errors.precio = "Debe tener precio";
        }else if (!inputs.categoria) {
            errors.categoria = "Debe escojer una categoria";
        }else if (!inputs.genero) {
            errors.genero = "Debe escojer una genero";
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
        }
    }
    function handleColors(e) {
        setType({
            ...type,
            color: e.target.id,
        });
        if (type.talla !== '') {
            setReadyType(true)
        }
    }
    function handleTalla(e) {
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
        let newlist = inputs.type.filter(t=> t.id !== type.id)
        if (newlist.length < inputs.type.length) {
            newlist.push(type)
            setInputs({...inputs, type:newlist})
        }else{
            inputs.type.push(type)
        }
        setType({
            id:++type.id,
            color:'',
            talla:'',
            cantidad:1,
        })
        setReadyType(false)
        setShowTypes(false)
    }
    function handleSubmit(e) {
        e.preventDefault()

        if (inputs.imagenes.length === 0) {
            setReady(false)
            setErrors({...errors, img: 'debe agregar imagenes del producto'})
        }
        if (Object.keys(errors).length === 0) {
            dispatch(addProduct(inputs))
            setInputs({
                nombre: "",
                desc: "",
                precio: 0,
                categoria:"",
                genero: "",
                imagenes: [],
                type:[]
            });
              setErrors({
                nombre: "",
                desc: "",
                precio: null,
                categoria:"",
                genero: "",
                img:"",
            });
            setReady(true)
            alert('producto creado!')
            navigate("/admin?pestaña=productos");
        }else{
            setReady(false)
        }
    }
    return(
        <div className='relative'>
            <div className="w-full text-black " >
                <Link className='absolute left-10 top-6 text-cyan-400' to={'/admin?pestaña=productos'}>
                    <p>Go Back</p>
                </Link>
                <div className='mt-20 w-full'>
                    <h2 className=''>Agregar</h2>
                    <form className='' onSubmit={handleSubmit}>
                        <div className=''>
                            <label className=''>Nombre</label>
                            <input
                                className=''
                                name="nombre"
                                value={inputs.nombre}
                                onChange={handleChange}
                                placeholder="Zapatillas Nike"
                            ></input>
                        </div>
                        {ready === false ?
                            <p className=''>{errors.nombre}</p>
                        :null}
                        <div className=''>
                            <label className=''>Descripcion</label>
                            <input
                                className=''
                                name="desc"
                                value={inputs.desc}
                                onChange={handleChange}
                                placeholder="loren input black..."
                            ></input>
                        </div>
                        {ready === false ?
                            <p className=''>{errors.desc}</p>
                        :null}
                        <div className=''>
                            <label className=''>Precio</label>
                            <input
                                className=''
                                name="precio"
                                value={inputs.precio}
                                onChange={handleChange}
                                placeholder="$599"
                            ></input>
                        </div>
                        {ready === false ?
                            <p className=''>{errors.precio}</p>
                        :null}
                        <div className=''>
                            <select onChange={handleChange} name="categoria" defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled='true'>
                                    Categoría
                                </option>
                                <option value="remera">remera</option>
                                <option value="calza">calza</option>
                                <option value="short">short</option>
                                <option value="accesorio">accesorio</option>
                            </select>
                        </div>
                        {ready === false ?
                            <p className=''>{errors.categoria}</p>
                        :null}
                        <div className=''>
                            <select  onChange={handleChange} name="genero" defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled='true'>
                                    Genero
                                </option>
                                <option value="femenino">Femenino</option>
                                <option value="masculino">Masculino</option>
                                <option value="unisex">Unisex</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        {ready === false ?
                            <p className=''>{errors.genero}</p>
                        :null}
                        <div>
                            <div onClick={()=>setAddImg(true)}>
                                <p>Imagenes</p>
                                <img className='w-8 h-8 mx-auto' src={vectorAdd} alt="vector" />
                            </div>
                            {ready === false ?
                            <p className=''>{errors.img}</p>
                            :null}
                            {addImg ?
                            <div className=''>
                                <input
                                    className=''
                                    name="img"
                                    value={img.url}
                                    onChange={handleimagenes}
                                    placeholder="url"
                                ></input>
                                {validateImg ?
                                    <p onClick={addImage}>Add</p>
                                :null}
                            </div>: null}
                            {inputs.imagenes.length !== 0 ? 
                                inputs.imagenes.map(img=>{
                                    return(
                                        <div className='w-32 h-32'>
                                            <img src={img} alt="imagen" />
                                        </div>
                                    )
                                })
                            : null}
                        </div> 
                        <div>
                            <div>
                                <p>Detalles:</p>
                                <img onClick={()=> setShowTypes(true)} className='w-8 h-8 mx-auto' src={vectorAdd} alt="vector" />
                            </div>
                            {inputs.type.map(t=>{
                                return(
                                    <div key={t.id} className='flex bg-gray-100 justify-evenly'>
                                        <div>
                                            <p>color: {t.color}</p>
                                        </div>
                                        <div>
                                            <p>talla: {t.talla}</p>
                                        </div>
                                        <div>
                                            <p>Cantidad: {t.cantidad}</p>
                                        </div>
                                        <div>
                                            <ul className="flex flex-row items-center gap-2">
                                                <li onClick={editType}>
                                                    <button
                                                        id={`${t.id},${t.color},${t.talla},${t.cantidad}`}
                                                        className="p-1.5 bg-bluey rounded-full"
                                                    >
                                                        <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        color="#000000"
                                                        >
                                                            <path
                                                                d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
                                                                stroke="#000000"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </li>

                                                <li onClick={deleteType}>
                                                    <button id={t.id} className="p-1.5 border-bluey rounded-full">
                                                        <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        color="#000000"
                                                        >
                                                            <path
                                                                d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                                                                stroke="#000000"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                            {showType === true ?  
                                <div className='flex flex-col justify-center h-fit w-52 bg-zinc-400 rounded-lg'>
                                    <div className='flex justify-center'>
                                        <div>
                                            <p>color</p>
                                            <div id='black' onClick={handleColors} className='w-4 h-4 rounded-xl bg-black'></div>
                                            <div id='red' onClick={handleColors} className='w-4 h-4 rounded-xl bg-red-700'></div>
                                            <div id='blue' onClick={handleColors} className='w-4 h-4 rounded-xl bg-blue-800'></div>
                                            <div id='rosa' onClick={handleColors} className='w-4 h-4 rounded-xl bg-rose-500'></div>
                                            <div id='blanco' onClick={handleColors} className='w-4 h-4 rounded-xl bg-white border border-black'></div>
                                        </div>
                                        <div>
                                            <p>talla</p>
                                            <div id='xs' onClick={handleTalla}>XS</div>
                                            <div id='s' onClick={handleTalla}>S</div>
                                            <div id='m' onClick={handleTalla}>M</div>
                                            <div id='l' onClick={handleTalla}>L</div>
                                            <div id='xl' onClick={handleTalla}>Xl</div>
                                        </div>
                                    </div>
                                    {readyType === true ? 
                                        <div className='flex flex-col justify-center'>
                                            <p>cantidad</p>
                                            <div className='flex justify-center'>
                                                <p id='menos' onClick={handleCantidad}>-</p>
                                                <p>{type.cantidad}</p>
                                                <p id='mas' onClick={handleCantidad}>+</p>
                                            </div>
                                            <div onClick={handleType} className='h-fit w-full bg-gray-600 text-white rounded-b-md'>
                                                <p>Listo!</p>
                                            </div>
                                        </div>
                                    :null}
                                </div>
                            : null}
                        </div>
                        <button className=' ' type="submit">Crear Producto</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default  CreateProduct;