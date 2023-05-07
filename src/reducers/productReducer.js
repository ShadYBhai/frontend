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

export const deleteProducts = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
