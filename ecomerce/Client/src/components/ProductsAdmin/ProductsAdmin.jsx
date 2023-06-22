import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, productToEdit, deleteProductById, enhanceProduct, allEnhanceProducts } from '../../redux/actions'
import vectorAdd from '../../assets/VectorAdd.png'
import edit from '../../assets/edit.png'
import CardsProduct from '../CardsProduct/CardsProduct'
//import swal from 'sweetalert';


export default function ProductsAdmin() {
  const dispatch = useDispatch()
  const {products} = useSelector(state=> state)
  const {enhanceProducts} = useSelector(state=> state)

  const [showEdit,setShowEdit] = useState({id:null,show:false})
  useEffect(()=>{
    dispatch(getAllProducts())
  },[])
  useEffect(()=>{
    dispatch(allEnhanceProducts())

  }, [enhanceProducts])
  const navigate = useNavigate()
  const go = (ruta) => {
    navigate(ruta)
  }
  const editProduct = (id) => {
    dispatch(productToEdit(id))
    go(`/admin?pestaña=editProduct`)
  }
  const destacarProducto = (id) => {
    dispatch(enhanceProduct(id))
    enhanceProducts?.find(item => item.id === id)
    ?
      swal("Producto destacado desactivado", {
        icon: "success",
      })
    :

      swal("Producto destacado correctamente", {
        icon: "success",
      })
  }

  const deleteProduct = (e) => {
    let id = Number(e.target.id)
    swal({
      title: "Estas seguro que quieres borrarlo?",
      text: "Una ves borrado no podrás recuperar el producto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProductById(id))
        swal("El producto se elimino correctamente", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  return (
    <div className='text-black flex flex-wrap mt-6 md:mt-0'>
      <Link to={'/admin?pestaña=formProducts'} className=' mx-4 mt-10 w-64 md:w-72 h-72 rounded-lg bg-none border border-gray-500 border-dashed relative shadow hover:shadow-xl'>
        <div className='flex h-full justify-center align-center flex-col'>
          <img className='w-8 h-8 mx-auto' src={vectorAdd} alt="vector" />
          <p className='mt-2'>Agregar</p>
        </div>
      </Link>
      {products?.map((product, index) => {
        let imagenes = product.image.map(i=>{
          if(i.url !== undefined){
            return i.url
          }else {
            return i
          }
        })
        return(
          <div onMouseEnter={()=>setShowEdit({id:product.id,show:true})} onMouseLeave={()=>setShowEdit({id:null,show:false})} key={index} className='flex justify-center mx-4 relative shadow-lg dark:shadow-slate-950'>
            <CardsProduct 
              key={product.id}
              name={product.name} 
              price={product.price} 
              image={imagenes[0]} 
              seeDetails={() => go(`/product/${product.id}`)}  
            />
            {showEdit.id === product.id ?
              <div className='flex justify-center absolute w-64 md:w-72 h-80 lg:h-72 rounded-lg bg-gray-500 dark:bg-gray-200 bottom-0'>
                  <div onClick={()=> editProduct(showEdit.id)} className='relative cursor-pointer hover:bg-sky-700 hover:shadow-xl transition-all my-auto mr-6 z-10 w-fit h-fit p-4 bg-sky-500 rounded-full'>
                      <img className=' h-5  w-5' src={edit} alt="" />
                  </div>
                  <div onClick={deleteProduct} className="p-2.5 cursor-pointer my-auto border-bluey hover:bg-sky-200 dark:hover:bg-sky-500 hover:shadow-xl w-fit h-fit border rounded-full">
                      <svg id={showEdit.id} width="35px" height="35px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                          <path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                      </svg>
                  </div>
                  <div onClick={()=> destacarProducto(showEdit.id)} className="p-2.5 cursor-pointer my-auto border-bluey hover:bg-sky-200 dark:hover:bg-sky-500 hover:shadow-xl w-fit h-fit border rounded-full">
                    
                    
                    { 
                    
                    enhanceProducts?.find(item => item.id === product.id)
                    ? 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    : 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg> 

                     }
                  </div>
              </div>
            : null}
          </div>
        )
      })}
    </div>
  )
}
