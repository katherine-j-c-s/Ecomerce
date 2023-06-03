import { ADD_PRODUCT,GET_ALL_PRODUCTS, FILTER_PRODUCTS, AGREGAR_FILTRO, REMOVER_FILTRO, SIGN_IN } from "./types";

const initialState = {
  products: [],
  created: [],
  productsFiltered: [],
  filtros: [],
  access: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        created: [...state.created, action.payload],
      }
    case GET_ALL_PRODUCTS:
      let allProducts = [...state.created,...action.payload]
      console.log(allProducts);
      return { ...state, products: allProducts };
    case FILTER_PRODUCTS:
      console.log(state.filtros)
      let resultado = state.products
      state.filtros.forEach(({name, valor}) => {
        resultado = resultado.filter(product => product[name] === valor)
      });
      return {...state, productsFiltered: resultado};
    case SIGN_IN:
        return { ...state, access: true };
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
