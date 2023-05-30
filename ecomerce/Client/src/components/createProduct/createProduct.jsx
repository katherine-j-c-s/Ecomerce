import { useState } from "react"
//SE PUEDE USAR FORMIK
const CreateProduct = ()=>{

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
        setProduct({
            name: '',
            description:'',
            price:'',
            quantity:'',
            gender:'',
            image:''
        })
    }


    return (
        <div>
            <h3>Agregar</h3>
            <form onSubmit={handlerSubmit}>
                <label>
                    Nombre: 
                    <input type='text' placeholder="Zapatillas Nikelahuelas" name='name' value={product.name} onChange={handlerChange}/>
                </label>
                <label>
                    Descripcion: 
                    <input type='text' placeholder="Lorem ..." name='description' value={product.description} onChange={handlerChange}/>
                </label>
                <label>
                    Precio: 
                    <input type='text' placeholder="599" name='price' value={product.price} onChange={handlerChange}/>
                </label>
                <label>
                    Cantidad: 
                    <input type='text' placeholder="200 unidades" name='quantity' value={product.quantity} onChange={handlerChange}/>
                </label>
                <label>
                    gender: 
                    <input type='text' placeholder="Ropa masculina" name='gender' value={product.gender} onChange={handlerChange}/>
                </label>
                <label>
                    Imagen: 
                    <input type='text' placeholder="C/Desktop/img.jpg" name='image' value={product.image} onChange={handlerChange}/>
                </label>
                <div>
                    <button type='submit'>Crear Producto</button>
                </div>
                
            </form>
            
        </div>
    )

}

export default  CreateProduct;