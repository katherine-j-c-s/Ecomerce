import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function SignInForm() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    function validate(inputs) {
        const errors = {};
        if (!inputs.email) {
            errors.email = "Debe haber un email";
        } else if (!inputs.password) {
            errors.password = "Debe haber un password";
        } 
        else if (!regexEmail.test(inputs.email)) {
            errors.email = "Debe ser un email válido";
        } else if (inputs.password.length < 8) {
            errors.password = "Debe tener al menos 8 caracteres";
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
    function handleSubmit(e) {
        if (Object.keys(errors).length === 0) {
            setInputs({
              email: "",
              password: "",
            });
              setErrors({
                email: "",
                password: "",
            });
            alert('Bienvenido!')
            navigate("/");
        }
    }
    return(
        <div className='flex justify-between text-white'>
            <div className='bg-black w-full md:w-2/5'>
                <Link to={'/'}>
                    <p className='text-white relative top-4 left-10 w-fit'>Go Back</p>
                </Link>
                <div className=' h-screen mt-28'>
                    <h2 className='mb-16 font-bold text-3xl'>Sign In</h2>
                    <form className='flex flex-col align-middle justify-center w-10/12 md:w-3/5 mx-auto' onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-center w-full relative mb-6'>
                            <label className='absolute w-16 bg-black h-fit bottom-10 left-8 text-cyan-400'>Email </label>
                            <input
                                className='placeholder-slate-400 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-2 pl-10'
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                placeholder="ejemplo@gmail.com"
                            ></input>
                        </div>
                        <p className='text-rose-500 relative bottom-6 md:bottom-8'>{errors.email}</p>
                        <div className='flex flex-col justify-center w-full relative'>
                            <label className='absolute w-16 bg-black h-fit bottom-10 left-8 text-cyan-400'>Password </label>
                            <input
                                className='placeholder-slate-400 py-2 focus:outline-none focus:border-cyan-500 md:m-2 border border-white bg-transparent rounded-md p-1 pl-10'
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                placeholder="********"
                            ></input>
                        </div>
                        <p className='text-rose-500 relative bottom-0 md:bottom-2'>{errors.password}</p>
                        <p className='text-cyan-500 underline mt-3 font-thin text-sm'>Me olvide mi contraseña</p>
        
                        <button className='bg-cyan-400 py-3 my-6 text-slate-300 ' type="submit">Iniciar</button>
                    </form>
                    <Link to={'/signUp'}>
                        <p className='text-cyan-500 underline mt-3 font-thin text-sm'>Sign Up</p>
                    </Link>
                </div>
                
            </div>
            <div className='hidden md:flex w-3/5 bg-gradient-to-r from-gray-600 to-sky-950 h-screm'>
                <div className='relative w-full flex align-middle justify-center'>
                    <div className='absolute top-40'>
                        <p className='text-9xl text-slate-500'>“</p>
                    </div>
                    <div className='w-2/6 text-left mt-60 font-thin text-slate-300'>
                        <p>El deporte es el lenguaje universal que conecta mente, cuerpo y espíritu en la búsqueda de la excelencia</p>
                        <p className='mt-6'>Aristóteles.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}





