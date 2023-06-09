import {
  SHOW_SIDEBAR,
  DISABLE_CART,
  ADD_PRODUCT_CART,
  ADD_QUANTITY,
  DELETE_QUANTITY,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
  USER_BY_ID,
  ADD_PRODUCT,
  GET_FILTERS,
  SET_FILTERS,
  AGREGAR_FILTRO,
  REMOVER_FILTRO,
  PRODUCT_TO_EDIT,
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCT_TO_EDIT,
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
    access: false,
  },

  sideBarCar: {
    enable: true,
    products: [
      {
        id: 1,
        name: "Adicolor Heritage Now Flared",
        price: "61999",
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2e596edc44884006a9cbaef3011a34de_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM1.jpg",
        quantity: 1,
      },
      {
        id: 2,
        name: "Adicolor Heritage Now Flared",
        price: "61999",
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2e596edc44884006a9cbaef3011a34de_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM1.jpg",
        quantity: 1,
      },
    ],
    total: 0,
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
      const newPriceA =
        parseInt(action.payload.price) * action.payload.quantity;

      const newTotalA = state.sideBarCar.total + newPrice;

      return {
        ...state,
        sideBarCar: {
          ...state.sideBarCar,
          products: [...state.sideBarCar.products, action.payload],
          total: newTotalA,
        },
      };

    case ADD_QUANTITY:
      let findProduct = state.sideBarCar.products[action.payload];

      findProduct.quantity++;

      const newPrice = parseInt(findProduct.price) * findProduct.quantity;

      const newTotal = state.sideBarCar.total + newPrice;

      console.log(findProduct);
      console.log(newPrice);

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

      if (findProduct2.quantity <= 0) {
        var newProdutcs = state.sideBarCar.products.splice(action.payload, 1);
      }

      findProduct2.quantity--;

      const newPrice2 = parseInt(findProduct2.price) - findProduct2.quantity;

      const newTotal2 = state.sideBarCar.total - newPrice2;

      return {
        ...state,
        sideBarCar: {
          ...state.sideBarCar,
          products: newProdutcs || [...state.sideBarCar.products],
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
    default:
      return state;
  }
};

export default rootReducer;
