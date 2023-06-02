import { GET_ALL_PRODUCTS, FILTER_PRODUCTS,  AGREGAR_FILTRO, REMOVER_FILTRO  } from "./types";

import axios from 'axios'

axios.defaults.baseURL = 'https://ecomerce-production-8f61.up.railway.app/'

///foingwhile
const tallas = ['XS', 'S', 'M', 'XL', 'XLL'];
const categorias = ['Remeras', 'Pantalones', 'Zapatillas', 'Medias'];
const colores = ['Rojo', 'Azul', 'Verde', 'Negro', 'Naranja'];

const randomElement = array => array[Math.floor(Math.random() * array.length)];




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
      const Products = Data.data.map(product => {
          const talla = randomElement(tallas);
          const categoria = randomElement(categorias);
          const color = randomElement(colores);
        
          return {
            ...product,
            Tallas: talla,
            Categoría: categoria,
            Color: color
          };
      });

      dispatch({type: GET_ALL_PRODUCTS, payload: Products })
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