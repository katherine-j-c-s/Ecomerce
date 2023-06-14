import {
  SHOW_SIDEBAR,
  DISABLE_CART,
  ADD_PRODUCT_CART,
  ADD_QUANTITY,
  DELETE_QUANTITY,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  ADD_IMG,
  USER_ADMIN,
  REMOVE_IMG,
  USER_BY_ID,
  ADD_PRODUCT,
  GET_FILTERS,
  SET_FILTERS,
  EDIT_PRODUCT,
  GET_ALL_USERS,
  DELETE_PRODUCT,
  AGREGAR_FILTRO,
  REMOVER_FILTRO,
  PRODUCT_TO_EDIT,
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCT_TO_EDIT,
  USER_UPDATE,
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "https://ecomerce-production-8f61.up.railway.app/";

////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////////PRODUCTS////

export const getAllProducts = () => {
  return async function (dispatch) {
    let Data = await axios.get("/products/get_products");
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
    const Data = await axios.get(`products/get_product/${id}`);
    const producto = Data.data;
    dispatch({ type: GET_PRODUCT_BY_ID, payload: producto });
  };
};

export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL });

////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////////FILTERS////

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

////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////////SIGN IN & UP////

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
////USERS////////USERS////////USERS////////USERS////////USERS////////USERS////////USERS////////USERS////////USERS////////USERS////
export function getUserId(id) {
  return async function (dispatch) {
    let { data } = await axios(
      `https://ecomerce-production-8f61.up.railway.app/users/${id}`
    );

    return dispatch({ type: USER_BY_ID, payload: data });
  };
}
export function getAllUsers() {
  return async function (dispatch) {
    let { data } = await axios(
      "https://ecomerce-production-8f61.up.railway.app/users"
    );
    return dispatch({ type: GET_ALL_USERS, payload: data });
  };
}
export function userAdmin(user) {
  return {
    type: USER_ADMIN,
    payload: user,
  };
}
////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////////SIDE_BAR////

export function showCart() {
  return { type: SHOW_SIDEBAR };
}

export function disableCart() {
  return { type: DISABLE_CART };
}

export function addProductCart(product) {
  return {
    type: ADD_PRODUCT_CART,
    payload: product,
  };
}

export function addQuantityProduct(id) {
  return { type: ADD_QUANTITY, payload: id };
}

export function deleteQuantityProduct(id) {
  return { type: DELETE_QUANTITY, payload: id };
}

////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////////POST_DETELE_PRODUCT////

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
  console.log(products);
  return async function (dispatch) {
    try {
      const data = await axios.all(
        products.map((product) =>
          axios.post(
            `https://ecomerce-production-8f61.up.railway.app/products/create_product`,
            product
          )
        )
      );
      return dispatch({
        type: ADD_PRODUCT,
        payload: products,
      });
    } catch (error) {
      console.error("add products error ===>", error);
    }
  };
};
export const deleteProductById = (id) => {
  return async function (dispatch) {
    try {
      const Data = await axios.delete(`products/remove_product/${id}`);
      dispatch({ type: DELETE_PRODUCT });
    } catch (error) {
      console.log("delete products error ===>", error);
    }
  };
};

////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////////EDIT PRODUCT////

export const productToEdit = (id) => {
  return async function (dispatch) {
    const Data = await axios.get(`products/get_product/${id}`);
    const producto = Data.data;
    dispatch({ type: PRODUCT_TO_EDIT, payload: producto });
  };
};
export const clearProductToEdit = () => {
  return { type: CLEAR_PRODUCT_TO_EDIT };
};
export const editProduct = (obj) => {
  let edit = {
    name: obj.name,
    price: Number(obj.price),
    description: obj.description,
    stock: obj.stock,
    color: obj.color,
    category: obj.category,
    size: obj.size,
  };
  console.log(edit);
  console.log(obj.id);
  return async function (dispatch) {
    try {
      const data = await axios.patch(
        `https://ecomerce-production-8f61.up.railway.app/products/update_product/${obj.id}`,
        edit
      );
      dispatch({ type: EDIT_PRODUCT });
    } catch (error) {
      console.log("edit product error --->", error);
    }
  };
};
export const addImgToProduct = (obj) => {
  return async function (dispatch) {
    try {
      const data = await axios.post(
        `https://ecomerce-production-8f61.up.railway.app/products/add_image`,
        obj
      );
      return dispatch({
        type: ADD_IMG,
      });
      //"Imagen añadida correctamente"
    } catch (error) {
      console.log("add img products error ===>", error);
    }
  };
};
export const removeImgToProduct = (obj) => {
  console.log(obj);
  return async function (dispatch) {
    try {
      const data = await axios.patch(
        `https://ecomerce-production-8f61.up.railway.app/products/remove_image`,
        obj
      );
      return dispatch({
        type: REMOVE_IMG,
      });
    } catch (error) {
      console.log("delete img products error ===>", error);
    }
  };
};

export const userUpDate = (id, userUpdate) => {
  return async function (dispatch) {
    try {
      const data = await axios.patch(
        `https://ecomerce-production-8f61.up.railway.app/users/${id}`,
        userUpdate
      );
      return dispatch({
        type: USER_UPDATE,
        payload: data,
      });
    } catch (error) {
      console.log("delete img products error ===>", error);
    }
  };
};
