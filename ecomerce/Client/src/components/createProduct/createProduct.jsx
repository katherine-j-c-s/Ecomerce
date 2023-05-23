import { useState } from "react"

const createProduct = ()=>{

    const [product, setProduct] = useState({
        name: '',
        description:'',
        price:'',
        quantity:'',
        gender:'',
        image:''
    })


    const handlerChange = (event)=>{
        const {name, value} = event.target;
        setProduct((prevProduct)=>({ 
            ...prevProduct,
            [name]: value
        }))
    }

    const handlerSubmit = (event)=>{
        event.preventDefault();
        console.log(product);
    }


    return (
        <div>
            <h3>Agregar</h3>
            <form onSubmit={handlerSubmit}>
                <label>
                    Nombre: 
                    <input type='text'  name='name' value={product.name} onChange={handlerChange}/>
                </label>
                <label>
                    Descripcion: 
                    <input type='text'  name='description' value={product.description} onChange={handlerChange}/>
                </label>
                <label>
                    Precio: 
                    <input type='text'  name='price' value={product.price} onChange={handlerChange}/>
                </label>
                <label>
                    Cantidad: 
                    <input type='text'  name='quantity' value={product.quantity} onChange={handlerChange}/>
                </label>
                <label>
                    gender: 
                    <input type='text'  name='gender' value={product.gender} onChange={handlerChange}/>
                </label>
                <label>
                    Imagen: 
                    <input type='text'  name='image' value={product.image} onChange={handlerChange}/>
                </label>
                
            </form>
            
        </div>
    )

}

export default createProduct