import axios from "axios";

export const getProducts = () => async (dispatch) => {
  const products = await axios.get(`http://localhost:4000/products`);

  dispatch({
    type: "GET_PRODUCTS",
    payload: {
      products: products,
    },
  });
};

export const addProduct = (newProduct) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/add-product",
      newProduct
    );
    dispatch({
      type: "ADD_PRODUCT",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST " });

  try {
    const response = await axios.put(
      `http://localhost:4000/products/${product._id}`,
      product
    );

    const updatedProduct = response.data;

    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: updatedProduct,
    });
  } catch (err) {
    dispatch({
      type: " UPDATE_PRODUCT_FAILURE",
      payload: err.message,
    });
  }
};