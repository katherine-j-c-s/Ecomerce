import { 
  GET_ALL_PRODUCTS, 
  FILTER_PRODUCTS,  
  AGREGAR_FILTRO, 
  REMOVER_FILTRO, 
  SIGN_IN, 
  GET_PRODUCT_BY_ID, 
  CLEAR_PRODUCT_DETAIL,
  GET_FILTERS,
  SET_FILTERS,

} from "./types";

import axios from 'axios'

axios.defaults.baseURL = 'https://ecomerce-production-8f61.up.railway.app/'


export const signIn = () => {
  return {
    type: SIGN_IN,
  };
}



export const getAllProducts = () => {
  return async  function(dispatch){
      let Data = await axios.get("/products")
      const Products = Data.data

      //Leemos filtros desde local storage
      const filtrosAlmacenados = localStorage.getItem('filtrosLocal')
      let filtros = []
      if(filtrosAlmacenados){
        filtros = JSON.parse(filtrosAlmacenados)
      }
      dispatch({type: GET_ALL_PRODUCTS, payload: Products})
      //Si hay filtros almacenados, despachamos una accion
      if(filtros.length > 0){
        dispatch({type: SET_FILTERS, payload: filtros})
      }
  }
}
export const getProductById = (id) => {
  return async function(dispatch){
      const Data = await axios.get(`/products/${id}`)
      const producto = Data.data
      dispatch({type: GET_PRODUCT_BY_ID, payload: producto})
  }
}

export const filterProducts = () =>{
    return{type: FILTER_PRODUCTS}
}

export const agregarFiltro = (filtro) => {
  return (dispatch, getState) => {
    dispatch({ type: AGREGAR_FILTRO, payload: filtro });

    const { filtros } = getState();
    localStorage.setItem('filtrosLocal', JSON.stringify(filtros));
  };
}

export const removerFiltro = (filtro) => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVER_FILTRO, payload: filtro });

    const { filtros } = getState();
    localStorage.setItem('filtrosLocal', JSON.stringify(filtros));
  };
}

export const getFilters = (filtro) => {
  return async function(dispatch){
    const Data = await axios.get(`/${filtro}`)
    const FilterData = Data.data
    dispatch({type: GET_FILTERS, payload: [`${filtro}` ,FilterData]})
   

  }
}


export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL  });