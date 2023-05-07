import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
// import rootReducer from "./reducers";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
