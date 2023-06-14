import React, { useEffect } from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import { useLocation } from 'react-router-dom'
import ProductsAdmin from '../../components/ProductsAdmin/ProductsAdmin'
import CreateProduct from '../../components/createProduct/createProduct'
import CardUserAdmin from '../../components/CardUserAdmin/CardUserAdmin'
import EditProductForm from '../../components/EditProductForm.jsx/EditProductForm'
import { useDispatch  } from 'react-redux'
import { clearProductToEdit } from '../../redux/actions'
import UserDetailAdmin from '../../components/UserDetailAdmin/UserDetailAdmin'
import Dashboard from '../Dashboard/Dashboard'

export default function Admin() {
  let { search } = useLocation();
  let dispatch = useDispatch()
  useEffect(()=>{
    if (query === 'productos') {
      dispatch(clearProductToEdit())
    }
  },[search])
  let query = search.slice(14, search.length);
  return ( 
    <div className="flex bg-[#F5F4F7]">
      <SidebarAdmin />
      {query === "dashboard" ? <Dashboard/> : null}
      {query === "usuarios" ? <CardUserAdmin/> : null}
      {query === "usuarioDetail" ? <UserDetailAdmin/> : null}
      {query === "estadisticas" ? (<h2 className="text-black">{query}</h2>) : null}
      {query === "envios" ? <h2 className="text-black">{query}</h2> : null}
      {query === "productos" ? <ProductsAdmin/> : null}
      {query === "formProducts" ? <CreateProduct /> : null}
      {query === "editProduct" ? <EditProductForm/> : null}
    </div>
  );
}
