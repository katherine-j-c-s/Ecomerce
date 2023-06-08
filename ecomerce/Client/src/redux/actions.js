import {
  GET_ALL_PRODUCTS,
  FILTER_PRODUCTS,
  AGREGAR_FILTRO,
  REMOVER_FILTRO,
  GET_FILTERS,
  SET_FILTERS,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  USER_BY_ID,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL,
  ADD_PRODUCT,
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "https://ecomerce-production-8f61.up.railway.app/";

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

export function getUserId(id) {
  return async function (dispatch) {
    let { data } = await axios(
      `https://ecomerce-production-8f61.up.railway.app/users/${id}`
    );

    return dispatch({ type: USER_BY_ID, payload: data });
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
    let Data = await axios.get("/products");
    const Products = Data.data;

    //Leemos filtros desde local storage
    const filtrosAlmacenados = localStorage.getItem("filtrosLocal");
    let filtros = [];
    if (filtrosAlmacenados) {
      filtros = JSON.parse(filtrosAlmacenados);
    }
    dispatch({ type: GET_ALL_PRODUCTS, payload: Products });
    //Si hay filtros almacenados, despachamos una accion
    if (filtros.length > 0) {
      dispatch({ type: SET_FILTERS, payload: filtros });
    }
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

export const agregarFiltro = (filtro) => {
  return (dispatch, getState) => {
    dispatch({ type: AGREGAR_FILTRO, payload: filtro });

    const { filtros } = getState();
    localStorage.setItem("filtrosLocal", JSON.stringify(filtros));
  };
};

export const removerFiltro = (filtro) => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVER_FILTRO, payload: filtro });

    const { filtros } = getState();
    localStorage.setItem("filtrosLocal", JSON.stringify(filtros));
  };
};

export const getFilters = (filtro) => {
  return async function (dispatch) {
    const Data = await axios.get(`/${filtro}`);
    const FilterData = Data.data;
    dispatch({ type: GET_FILTERS, payload: [`${filtro}`, FilterData] });
  };
};
export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL });

export const addProduct = (obj) => {
  let products = obj.type.map((t) => {
    let prodct = {
      name: obj.nombre,
      price: Number(obj.precio),
      description: obj.desc,
      image: obj.imagenes,
      stock: Number(t.cantidad),
      color: t.color,
      category: obj.categoria,
      size: t.talla,
    };
    return prodct;
  });
  return async function (dispatch) {
    try {
      const data = await axios.all(
        products.map((product) =>
          axios.post(
            `https://ecomerce-production-8f61.up.railway.app/products`,
            product
          )
        )
      );
      return dispatch({
        type: ADD_PRODUCT,
        payload: products,
      });
    } catch (error) {
      console.log("add products error ===>", error);
    }
  };
};
