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
        <div className='text-black'>
            <div>
                <Link to={'/'}>
                    <p className='text-black'>Go Back</p>
                </Link>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email </label>
                    <input
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        placeholder=""
                    ></input>
                    <p>{errors.email}</p>
                    <label>Password </label>
                    <input
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        placeholder=""
                    ></input>
                    <p>{errors.password}</p>
                    
                    <p className='text-black'>Me olvide mi contraseña</p>
                    
                    {Object.keys(errors).length === 0 ? (
                    <button type="submit">Ingresar</button>
                    ) : null}
                </form>
                <Link to={'/signUp'}>
                    <p className='text-black'>Sign Up</p>
                </Link>
            </div>
            <div className='bg-cyan-500 w-52 h-52'>
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





