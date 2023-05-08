import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productAction";
import axios from "axios";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [file, setFile] = useState(null);

  const [vat, setVat] = useState("");
  const [netPrice, setNetPrice] = useState("");
  const [grossPrice, setGrossPrice] = useState("");
  const [grossPricePerQty, setGrossPricePerQty] = useState("");
  const [VATPercentage, setVATPercentage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [allProducts, setAllProducts] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");

  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.products.products?.data
  );
  console.log(products);

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  const handleCancel = () => {
    setEditedProduct(null);
  };

  const [productsUpdated, setProductsUpdated] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      editedProduct.netPrice =
        editedProduct.grossPrice -
        (editedProduct.grossPrice * editedProduct.vat) / 100;
      console.log(editedProduct.netPrice);

      await dispatch(updateProduct(editedProduct));
      setEditedProduct(null);
      setProductsUpdated(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (productsUpdated) {
      dispatch(getProducts());
      setProductsUpdated(false);
    }
  }, [dispatch, productsUpdated]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post("http://localhost:4000/upload", formData);

    const netPricePerQty = grossPricePerQty - (grossPricePerQty * vat) / 100;

    const newProduct = {
      productName: productName,
      quantity: quantity,
      netPrice: netPricePerQty,
      grossPrice: grossPricePerQty,
      vat: vat,
    };

    dispatch(addProduct(newProduct)).then(() => {
      dispatch(getProducts());
    });

    handleClose();
    setProductName("");
    setVat("");
    setNetPrice("");
    setGrossPrice("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
    setSelectedProductId("");
  };
  function handleModalClose(event) {
    if (event.target.className === "modal") {
      setShowModal(false);
    }
  }
  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.productName}?`
    );
    if (confirmed) {
      dispatch(deleteProduct(product._id));
    }
  };

  useEffect(() => {
    getProducts();
  }, [handleSubmit]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <MainComponent>
      <SideComponent>
        <h1 className="heading">Products</h1>
        <ul>
          <GrAddCircle className="add-icon" />
          <button className="add-button" onClick={handleShow}>
            Add
          </button>
          <li className="product-name">Product Name</li>
          {products &&
            products.map((food) => (
              <>
                <li className="food">{food.productName}</li>
              </>
            ))}
        </ul>
      </SideComponent>
      {showModal && (
        <div className="modal" onClick={handleModalClose}>
          <div className="model-inner">
            <form className="add-product-form" onSubmit={handleSubmit}>
              <h2>Add Product</h2>
              <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="grossPrice">Price per Qty (Gross):</label>
                <input
                  type="number"
                  id="grossPrice"
                  min="0"
                  step="0.01"
                  value={grossPricePerQty}
                  onChange={(e) => setGrossPricePerQty(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="vat">VAT:</label>
                <select
                  id="vat"
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                  required
                >
                  <option value="">-- Select VAT Percentage --</option>
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  {/* Add more VAT percentage options if needed */}
                </select>
              </div>
              <div>
                <label htmlFor="netPrice">Price Per Qty (net):</label>
                <input
                  type="number"
                  id="netPrice"
                  min="0"
                  step="0.01"
                  value={netPrice}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <button className="add-product" type="submit">
                Add Product
              </button>
              {/* 
              <button className="file" type="submit">
                <input
                  className="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".png,.jpg,.jpeg"
                />
              </button> */}
            </form>
          </div>
        </div>
      )}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>VAT</th>
            <th>Quantity</th>
            <th>Net Price</th>
            <th>Gross Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  {editedProduct?._id === product._id ? (
                    <input
                      type="text"
                      name="productName"
                      value={editedProduct.productName}
                      onChange={handleChange}
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td>
                  {editedProduct?._id === product._id ? (
                    <input
                      type="text"
                      name="vat"
                      value={editedProduct.vat}
                      onChange={handleChange}
                    />
                  ) : (
                    `${product.vat}%`
                  )}
                </td>
                <td>
                  {editedProduct?._id === product._id ? (
                    <input
                      type="text"
                      name="quantity"
                      value={editedProduct.quantity}
                      onChange={handleChange}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editedProduct?._id === product._id ? (
                    <input
                      type="text"
                      name="netPrice"
                      value={editedProduct.netPrice}
                      onChange={handleChange}
                    />
                  ) : (
                    `$${product.netPrice ? product.netPrice.toFixed(2) : "-"}`
                  )}
                </td>
                <td>
                  {editedProduct?._id === product._id ? (
                    <input
                      type="text"
                      name="grossPrice"
                      value={editedProduct.grossPrice}
                      onChange={handleChange}
                    />
                  ) : (
                    `$${
                      product.grossPrice ? product.grossPrice.toFixed(2) : "-"
                    }`
                  )}
                </td>
                <td>
                  {editedProduct?._id === product._id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </MainComponent>
  );
};

export default Sidebar;

const InnerComponent = styled.table`
  /* width: 500px; */
  /* height: auto; */
  height: 700px;
  /* background: #f3f8ff; */
  /* display: flex; */
  margin: auto;
  /* justify-content: center; */

  .food-description {
    display: flex;
    justify-content: center;
    margin: auto;
  }
  ul {
    list-style: none;
  }

  ul li {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 32px;
    color: #062229;
  }
`;

const SideComponent = styled.div`
  padding-top: 1rem;
  width: 300px;
  height: 100vh;
  height: auto;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.05);

  ul {
    list-style: none;
    margin-top: 1rem;
  }
  ul li {
    padding: 1rem;
    width: 175px;
    height: 24px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .food {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 36px;
    color: #062229;
  }

  .heading {
    display: flex;
    justify-content: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #062229;
  }
  .add-button {
    width: 160px;
    height: 51px;
    margin: auto;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    border: none;
    text-align: center;
    margin-left: 0.6rem;
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.32);
    border-radius: 20px;
    margin-bottom: 1rem;
  }
  .add-icon {
    position: relative;
    left: 4.2rem;
    top: 1px;
  }
  .product-name {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 32px;
    color: #062229;
  }
`;

const MainComponent = styled.div`
  display: flex;
  .file {
    margin-top: 1rem;
    border: none;
  }
`;
