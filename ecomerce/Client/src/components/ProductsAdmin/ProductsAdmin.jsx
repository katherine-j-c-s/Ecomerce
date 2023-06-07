import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/actions'
import vectorAdd from '../../assets/VectorAdd.png'
import edit from '../../assets/edit.png'
import CardsProduct from '../CardsProduct/CardsProduct'

export default function ProductsAdmin() {
  const dispatch = useDispatch()
  const {products} = useSelector(state=> state)
  const [showEdit,setShowEdit] = useState({id:null,show:false})
  useEffect(()=>{
    dispatch(getAllProducts())
  },[])
  const navigate = useNavigate()
  const go = (ruta) => {
    navigate(ruta)
  }
  const deleteProduct = (e) => {
    swal({
      title: "Estas seguro que quieres borrarlo?",
      text: "Una ves borrado no podrás recuperar el producto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
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
      {products.map((product, index) => {
        let imgAdded = product.image.map(img =>{
          if(img.url){
              return img.url
          }
        })
        return(
          <div onMouseEnter={()=>setShowEdit({id:product.id,show:true})} onMouseLeave={()=>setShowEdit({id:null,show:false})} key={index} className='flex justify-center mx-4 relative'>
            <CardsProduct 
              key={product.id}
              name={product.name} 
              price={product.price} 
              image={imgAdded[0] !== undefined ? imgAdded[0] : product.image?.[0]} 
              seeDetails={() => go(`/product/${product.id}`)}  
            />
            {showEdit.id === product.id ?
              <div className='flex justify-center absolute w-64 md:w-72 h-80 lg:h-72 rounded-lg bg-gray-500 bottom-0'>
                  <div onClick={() => go(`/admin?pestaña=editProduct`)} className='relative cursor-pointer hover:bg-sky-700 hover:shadow-xl transition-all my-auto mr-6 z-10 w-fit h-fit p-4 bg-sky-500 rounded-full'>
                      <img id={showEdit.id} className=' h-5  w-5' src={edit} alt="" />
                  </div>
                  <div id={showEdit.id} onClick={deleteProduct} className="p-2.5 cursor-pointer my-auto border-bluey hover:bg-sky-200 hover:shadow-xl w-fit h-fit border rounded-full">
                      <svg width="35px" height="35px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                          <path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                      </svg>
                  </div>
              </div>
            : null}
          </div>
        )
      })}
    </div>
  )
}
