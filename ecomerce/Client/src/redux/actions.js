import { GET_ALL_PRODUCTS, FILTER_PRODUCTS,  AGREGAR_FILTRO, REMOVER_FILTRO, SIGN_IN, GET_PRODUCT_BY_ID, CLEAR_PRODUCT_DETAIL, ADD_PRODUCT  } from "./types";

import axios from 'axios'

axios.defaults.baseURL = 'https://ecomerce-production-8f61.up.railway.app/'

///foingwhile
/*const tallas = ['XS', 'S', 'M', 'XL', 'XLL'];
const categorias = ['Remeras', 'Pantalones', 'Zapatillas', 'Medias'];
const colores = ['Rojo', 'Azul', 'Verde', 'Negro', 'Naranja'];

const randomElement = array => array[Math.floor(Math.random() * array.length)];
*/

export const signIn = () => {
  return {
    type: SIGN_IN,
  };
}

export const loadFiltersFromLocalStorage = () => {
  return function(dispatch){
      const localStorageFilters = JSON.parse(localStorage.getItem('filtros'));
      if(localStorageFilters) {
          localStorageFilters.forEach(filtro => {
              dispatch(agregarFiltro(filtro));
          });
      }
  }
}

export const getAllProducts = () => {
  return async  function(dispatch){
      dispatch(loadFiltersFromLocalStorage());
      let Data = await axios.get("/products")
      const Products = Data.data
      dispatch({type: GET_ALL_PRODUCTS, payload: Products })
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

export const agregarFiltro = (valor) => {
  return { type: AGREGAR_FILTRO, payload:  valor };
}

export const removerFiltro = (valor) => {
  return { type: REMOVER_FILTRO, payload: valor };
}
export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL  });
  
export const addProduct = (obj) => {
  console.log(obj);
  let products = obj.type.map(t=>{
    let prodct = {
      name: obj.nombre,
      price: Number(obj.precio),
      description: obj.desc,
      image: obj.imagenes,
      stock: Number(t.cantidad),
      color: t.color,
      category: obj.categoria,
      size: t.talla
    }
    return prodct
  })  
  return async function (dispatch) {
    try { 
      for (let i = 0; i < products.length; i++) {
        const data = await axios.post(`https://ecomerce-production-8f61.up.railway.app/`,products[i]);
      }
      return dispatch({
        type: ADD_PRODUCT,
        payload: products,
      });
    } catch (error) {
      console.log("add products error ===>", error);
    }
  };
}
