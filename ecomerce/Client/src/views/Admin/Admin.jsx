import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { clearProductToEdit } from '../../redux/actions'

import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import ProductsAdmin from '../../components/ProductsAdmin/ProductsAdmin'
import CreateProduct from '../../components/createProduct/createProduct'
import CardUserAdmin from '../../components/CardUserAdmin/CardUserAdmin'
import EditProductForm from '../../components/EditProductForm.jsx/EditProductForm'
import UserDetailAdmin from '../../components/UserDetailAdmin/UserDetailAdmin'
import Dashboard from '../Dashboard/Dashboard'

export default function Admin() {
  let { search } = useLocation();
  let dispatch = useDispatch()
  let {darkModeAdmin} = useSelector(st=>st)
  useEffect(()=>{
    if (query === 'productos') {
      dispatch(clearProductToEdit())
    }
  },[search])
  let query = search.slice(14, search.length);
  return ( 
    <main className={!darkModeAdmin ? '' : 'dark'}>
      <div className="flex bg-slate-300 dark:bg-slate-900 ">
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
    </main>
    
  );
}
