import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../actions/productAction";

const MiddleComponent = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products?.data);

  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <InnerComponent>
        <ul className="unOrderlist">
          {/* <GrAddCircle className="add-icon" /> */}
          {/* <button className="add-button">Add</button> */}
          {/* <li className="product-name">Product Name</li> */}
          {products &&
            products.map((food) => (
              <>
                <li className="food">{food.productName}</li>
                <li>{food.nePrice}</li>
              </>
            ))}
        </ul>
      </InnerComponent>
    </>
  );
};

export default MiddleComponent;

const InnerComponent = styled.div`
  width: 500px;
  height: auto;
  height: 700px;
  background: #f3f8ff;
  display: flex;
  margin: auto;
  justify-content: center;

  .food-description {
    display: flex;
    justify-content: center;
    margin: auto;
  }
  ul {
    list-style: none;
  }
`;
