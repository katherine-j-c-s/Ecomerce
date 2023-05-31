import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function SignInForm() {
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
        e.preventDefault();
        alert('listo')
    }
    return(
        <div className='flex justify-between text-white'>
            <div className='bg-black w-2/5'>
                <Link to={'/'}>
                    <p className='text-white'>Go Back</p>
                </Link>
                <div className='flex flex-col align-middle justify-center h-screen '>
                    <h2 className='mb-20'>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='relative w-fit mb-6'>
                            <label className='absolute w-16 bg-black h-fit bottom-16 left-8'>Email </label>
                            <input
                                className='text-white m-2 border border-cyan-400 bg-transparent rounded-md p-2 pr-20 pl-4'
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                placeholder=""
                            ></input>
                        </div>
                        <p className='text-rose-500 relative bottom-0'>{errors.email}</p>
                        <div className='relative w-fit'>
                            <label className='absolute w-16 bg-black h-fit bottom-16 left-8'>Password </label>
                            <input
                                className='text-white m-2 border border-cyan-400 bg-transparent rounded-md p-1 pr-20 pl-4'
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                placeholder=""
                            ></input>
                        </div>
                        <p className='text-rose-500'>{errors.password}</p>
                        <p className='text-cyan-400 underline'>Me olvide mi contraseña</p>
        
                        {Object.keys(errors).length === 0 ? (
                        <button type="submit">Ingresar</button>
                        ) : null}
                    </form>
                    <Link to={'/signUp'}>
                        <p className='text-white'>Sign Up</p>
                    </Link>
                </div>
                
            </div>
            <div className='flex w-3/5 bg-cyan-500  h-screm'>
                <div>
                    <div>
                        <p>“</p>
                    </div>
                    <div>
                        <p>El deporte es el lenguaje universal que conecta mente, cuerpo y espíritu en la búsqueda de la excelencia</p>
                        <p>Aristóteles.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}





