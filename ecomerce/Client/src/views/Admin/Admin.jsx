import React from 'react'
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin'
import { useLocation } from 'react-router-dom'
import ProductsAdmin from '../../components/ProductsAdmin/ProductsAdmin'
import CreateProduct from '../../components/CreateProduct/CreateProduct'

export default function Admin() {
  let { search } = useLocation();
  let query = search.slice(14, search.length);
  return ( 
    <div className="flex bg-slate-300">
      <SidebarAdmin />
      {query === "dashboard" ? <h2 className="text-black">{query}</h2> : null}
      {query === "usuarios" ? <h2 className="text-black">{query}</h2> : null}
      {query === "estadisticas" ? (
        <h2 className="text-black">{query}</h2>
      ) : null}
      {query === "envios" ? <h2 className="text-black">{query}</h2> : null}
      {query === "productos" ? <ProductsAdmin /> : null}
      {query === "formProducts" ? <CreateProduct /> : null}
    </div>
  );
}
