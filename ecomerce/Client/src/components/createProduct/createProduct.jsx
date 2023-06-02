import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import vectorAdd from '../../assets/VectorAdd.png'

const reguexURL = /^(ftp|http|https):\/\/[^ "]+$/;

const CreateProduct = ()=>{
    const navigate = useNavigate()
    
    const [ready,setReady] = useState(true)
    const [addImg, setAddImg] = useState(false)
    const [validateImg, setvalidateImge] = useState({show:false,message:'Debe ser un url'})
    
    const [img, setImg] = useState('')
    const [inputs, setInputs] = useState({
        nombre: "",
        desc: "",
        precio: null,
        categoria:"",
        genero: "",
        imagenes: [],
    });
    const [errors, setErrors] = useState({
        nombre: "",
        desc: "",
        precio: null,
        categoria:"",
        genero: "",
        img:"",
    });
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
            setvalidateImge(true)
        }else if(addImg === false){
            inputs.imagenes.push(img)
            setImg('')
            console(inputs)
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(inputs);
        if (Object.keys(errors).length === 0) {
            setInputs({
                nombre: "",
                desc: "",
                precio: 0,
                categoria:"",
                genero: "",
                imagenes: [],
            });
              setErrors({
                nombre: "",
                desc: "",
                precio: null,
                categoria:"",
                genero: "",
                imagenes: [],
            });
            setReady(true)
            alert('producto creado!')
            // navigate("/");
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
                <div className=''>
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
                                    <button onClick={()=>setAddImg(false)}>Add</button>
                                :null}
                            </div>: null}
                        </div>
                        
                        <button className=' ' type="submit">Crear Producto</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default  CreateProduct;