import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import vectorAdd from '../../assets/VectorAdd.png'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;

const CreateProduct = ()=>{
    const navigate = useNavigate()
    
    const [ready,setReady] = useState(true)

    const [addImg, setAddImg] = useState(false)
    const [validateImg, setvalidateImge] = useState({ready:false,message:'Debe ser un url'})

    const [showType, setShowTypes]= useState(false)
    const [readyType, setReadyType] = useState(false)
    const [addType, setAddType] = useState(false)
    
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
            setErrors({...errors, img: ''})
        }
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
        inputs.type.push(type)
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
        if (Object.values(errors).length === 0) {
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
            console.log(inputs);
            setReady(true)
            alert('producto creado!')
            navigate("/admin?pestaña=productos");
        }else{
            setReady(false)
        }
    }
    return(
        <div className=''>
            <div className="w-full text-black " >
                <Link to={'/admin?pestaña=productos'}>
                    <p className=''>Go Back</p>
                </Link>
                <div className='relative'>
                    <h2 className='absolute top-0'>Agregar</h2>
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