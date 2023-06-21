import {
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  USER_ADMIN,
  USER_BY_ID,
  USER_UPDATE,
  ADD_PRODUCT,
  GET_FILTERS,
  SET_FILTERS,
  SHOW_SIDEBAR,
  DISABLE_CART,
  ADD_QUANTITY,
  POST_COMMENTS,
  GET_ALL_USERS,
  AGREGAR_FILTRO,
  REMOVER_FILTRO,
  PRODUCT_TO_EDIT,
  DELETE_QUANTITY,
  FILTER_PRODUCTS,
  ADD_PRODUCT_CART,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_DARKMODE_ADMIN,
  ADD_DARKMODE_CLIENT,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCT_TO_EDIT,
  ENHANCE_PRODUCT,
  ALL_ENHANCE_PRODUCTS,
} from "./types";

const initialState = {
  products: [],
  created: [],
  productsFiltered: [],
  productDetail: [],
  productToEdit: {},
  filtros: [],
  userData: {
    id: "",
    image: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
  },
  allUsers: [],
  user: {},
  sideBarCar: {
    enable: false,
    products: [],
    total: 0,
  },
  sizes: [],
  categories: [],
  colors: [],
  darkModeAdmin: false,
  darkModeClient: false,
  commentsUser: [],
  enhanceProducts: [],
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
    case PRODUCT_TO_EDIT:
      return { ...state, productToEdit: action.payload };
    case CLEAR_PRODUCT_TO_EDIT:
      return { ...state, productToEdit: {} };
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
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          imageLocal: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          address: action.payload.address,
          role: action.payload.role,
          access: true,
        })
      );
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          role: action.payload.role,
          access: true,
        },
      };

    case USER_UPDATE:
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          imageLocal: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          address: action.payload.address,
          role: action.payload.role,
          access: true,
        })
      );
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          address: action.payload.address,
          role: action.payload.role,
          access: true,
        },
      };

    case SIGN_UP:
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          imageLocal: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          address: action.payload.address,
          role: action.payload.role,
          access: true,
        })
      );
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          role: action.payload.role,
          access: true,
        },
      };

    case LOG_OUT:
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: "",
          imageLocal: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          access: false,
        })
      );
      return {
        ...state,
        userData: {
          id: "",
          image: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        },
      };

    case USER_BY_ID:
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          imageLocal: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          address: action.payload.address,
          role: action.payload.role,
          access: true,
        })
      );
      return {
        ...state,
        userData: {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.mail,
          password: action.payload.password,
          role: action.payload.role,
          address: action.payload.address,
          orders: action.payload.UserOrders,
          comments: action.payload.comments,
        },
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case USER_ADMIN:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        sideBarCar: { ...state.sideBarCar, enable: true },
      };

    case DISABLE_CART:
      return {
        ...state,
        sideBarCar: { ...state.sideBarCar, enable: false },
      };

    case ADD_PRODUCT_CART:
      const findProductE = state.sideBarCar.products.find(
        (element) => element.id === action.payload.id
      );

      if (!findProductE) {
        const newPriceA = parseInt(action.payload.price);

        var newTotalA = state.sideBarCar.total + newPriceA;
      }

      return {
        ...state,
        sideBarCar: {
          ...state.sideBarCar,
          products: !findProductE
            ? [...state.sideBarCar.products, action.payload]
            : [...state.sideBarCar.products],
          total: newTotalA || state.sideBarCar.total,
        },
      };

    case ADD_QUANTITY:
      let findProduct = state.sideBarCar.products[action.payload];

      findProduct.quantity++;

      const newPrice = parseInt(findProduct.price);

      var newTotal = state.sideBarCar.total + newPrice;

      return {
        ...state,
        sideBarCar: {
          ...state.sideBarCar,
          products: [...state.sideBarCar.products],
          total: newTotal,
        },
      };

    case DELETE_QUANTITY:
      let findProduct2 = state.sideBarCar.products[action.payload];

      if (findProduct2.quantity <= 1) {
        state.sideBarCar.products.splice(action.payload, 1);
      }

      findProduct2.quantity--;

      var newTotal2 = state.sideBarCar.total - findProduct2.price;

      return {
        ...state,
        sideBarCar: {
          ...state.sideBarCar,
          products: [...state.sideBarCar.products],
          total: newTotal2,
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
    case ADD_DARKMODE_ADMIN:
      return { ...state, darkModeAdmin: action.payload };
    case ADD_DARKMODE_CLIENT:
      return { ...state, darkModeClient: action.payload };
    case POST_COMMENTS:
      return {
        ...state,
        commentsUser: [...state.commentsUser, action.payload],
      };

    case ALL_ENHANCE_PRODUCTS:
      return { ...state, enhanceProducts: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
