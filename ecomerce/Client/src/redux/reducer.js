//Nuestro estado inicial.
import { GET_ALL_PRODUCTS, FILTER_PRODUCTS, AGREGAR_FILTRO, REMOVER_FILTRO } from "./types";

const initialState = {
  products: [],
  productsFiltered: [],
  filtros: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case FILTER_PRODUCTS:
      console.log(state.filtros)
      let resultado = state.products
      state.filtros.forEach(({name, valor}) => {
        resultado = resultado.filter(product => product[name] === valor)
      });
      return {...state, productsFiltered: resultado};


    case AGREGAR_FILTRO:
      return {
        ...state,
        filtros: [...state.filtros, action.payload],
      };
    case REMOVER_FILTRO:
      console.log(state.filtros)
      const index = state.filtros.findIndex(filtro => filtro.name === action.payload.name && filtro.valor === action.payload.valor )
      state.filtros.splice(index, 1)
      return {...state, };
    default:
      return state;
  }
};

export default rootReducer;
