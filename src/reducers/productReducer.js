const initialState = {
  products: [],
  product: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };

    default:
      return initialState;
  }
};

export const addProductReducer = (state = initialState.product, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
    case "ADD_PRODUCT_REQUEST":
    case "UPDATE_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        loading: false,
        error: null,
      };
    case "GET_PRODUCTS_FAILURE":
    case "ADD_PRODUCT_FAILURE":
    case "UPDATE_PRODUCT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
