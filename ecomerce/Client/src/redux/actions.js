import {
  GET_ALL_PRODUCTS,
  FILTER_PRODUCTS,
  AGREGAR_FILTRO,
  REMOVER_FILTRO,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL,
  ADD_PRODUCT,
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "https://ecomerce-production-8f61.up.railway.app/";

///foingwhile
/*const tallas = ['XS', 'S', 'M', 'XL', 'XLL'];
const categorias = ['Remeras', 'Pantalones', 'Zapatillas', 'Medias'];
const colores = ['Rojo', 'Azul', 'Verde', 'Negro', 'Naranja'];

const randomElement = array => array[Math.floor(Math.random() * array.length)];
*/

export const signIn = (user) => {
  return async function (dispatch) {
    let { data } = await axios.post(
      "https://ecomerce-production-8f61.up.railway.app/users/login",
      user
    );

    return dispatch({ type: SIGN_IN, payload: data });
  };
};

export function signUp(user) {
  return async function (dispatch) {
    let { data } = await axios.post(
      "https://ecomerce-production-8f61.up.railway.app/users/signup",
      user
    );

    return dispatch({ type: SIGN_UP, payload: data });
  };
}

export function logOut() {
  return async function (dispatch) {
    axios.post("https://ecomerce-production-8f61.up.railway.app/users/logout");

    return dispatch({ type: LOG_OUT });
  };
}

export const loadFiltersFromLocalStorage = () => {
  return function (dispatch) {
    const localStorageFilters = JSON.parse(localStorage.getItem("filtros"));
    if (localStorageFilters) {
      localStorageFilters.forEach((filtro) => {
        dispatch(agregarFiltro(filtro));
      });
    }
  };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    dispatch(loadFiltersFromLocalStorage());
    let Data = await axios.get("/products");
    const Products = Data.data;
    dispatch({ type: GET_ALL_PRODUCTS, payload: Products });
  };
};
export const getProductById = (id) => {
  return async function (dispatch) {
    const Data = await axios.get(`/products/${id}`);
    const producto = Data.data;
    dispatch({ type: GET_PRODUCT_BY_ID, payload: producto });
  };
};

export const filterProducts = () => {
  return { type: FILTER_PRODUCTS };
};

export const agregarFiltro = (valor) => {
  return { type: AGREGAR_FILTRO, payload: valor };
};

export const removerFiltro = (valor) => {
  return { type: REMOVER_FILTRO, payload: valor };
};
export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL });

export const addProduct = (obj) => {
  console.log(obj);
  return { type: ADD_PRODUCT, payload: obj };
};
