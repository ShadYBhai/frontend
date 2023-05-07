import axios from "axios";

export const getProducts = () => async (dispatch) => {
  const products = await axios.get(
    `https://ace-backend-ydma.onrender.com/products`
  );

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
      "https://ace-backend-ydma.onrender.com/add-product",
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
      `https://ace-backend-ydma.onrender.com/products/${product._id}`,
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
