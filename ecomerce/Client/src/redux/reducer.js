import {
  ADD_PRODUCT,
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
} from "./types";

const initialState = {
  products: [],
  created: [],
  productsFiltered: [],
  productDetail: [],
  filtros: [],
  userData: {
    id: "",
    image: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    access: false,
  },
  sizes: [],
  categories: [],
  colors: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      let listCreated = [...state.created];
      listCreated.push(action.payload);
      return {
        ...state,
        created: listCreated,
      };
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, productDetail: action.payload };
    case CLEAR_PRODUCT_DETAIL:
      return { ...state, productDetail: state.productDetail };
    case FILTER_PRODUCTS:
      const filtrosPorCategoria = state.filtros.filter(
        (filtro) => filtro.name === "category"
      );
      const filtrosOtros = state.filtros.filter(
        (filtro) => filtro.name !== "category"
      );

      // Agrupar los otros filtros por su nombre
      const filtrosAgrupados = filtrosOtros.reduce((acc, filtro) => {
        if (!acc[filtro.name]) acc[filtro.name] = [];
        acc[filtro.name].push(filtro.valor);
        return acc;
      }, {});

      let resultado =
        filtrosPorCategoria.length > 0
          ? state.products.filter((product) =>
              filtrosPorCategoria.some(
                (filtro) => product[filtro.name] === filtro.valor
              )
            )
          : [...state.products];

      // Aplicar cada grupo de filtros
      Object.keys(filtrosAgrupados).forEach((name) => {
        const valores = filtrosAgrupados[name];
        resultado = resultado.filter((product) =>
          valores.includes(product[name])
        );
      });

      return { ...state, productsFiltered: resultado };
    case SET_FILTERS: {
      return {
        ...state,
        filtros: action.payload,
      };
    }
    case SIGN_IN:
      const imageObj = JSON.parse(action.payload.image);
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: imageObj,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          access: true,
        },
      };

    case SIGN_UP:
      const imageObj2 = JSON.parse(action.payload.image);
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: imageObj2,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          access: true,
        },
      };

    case LOG_OUT:
      return {
        ...state,
        userData: {
          id: "",
          image: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
          access: false,
        },
      };

    case USER_BY_ID:
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: "",
          access: true,
        },
      };
    case AGREGAR_FILTRO:
      return {
        ...state,
        filtros: [...state.filtros, action.payload],
      };
    case REMOVER_FILTRO:
      const index = state.filtros.findIndex(
        (filtro) =>
          filtro.name === action.payload.name &&
          filtro.valor === action.payload.valor
      );
      state.filtros.splice(index, 1);
      return { ...state };

    case GET_FILTERS:
      return { ...state, [action.payload[0]]: action.payload[1] };
    default:
      return state;
  }
};

export default rootReducer;
