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
import { AiFillEdit } from "react-icons/ai";
import EditComponent from "./EditComponent";
import AddProduct from "./AddProduct";
import { AiFillDelete } from "react-icons/ai";

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
  const [editedProduct, setEditedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [productsUpdated, setProductsUpdated] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.products.products?.data
  );

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  const handleCancel = () => {
    setEditedProduct(null);
  };

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
    formData.append("productName", productName);
    try {
      const response = await axios.post(
        "https://ace-backend-ydma.onrender.com/upload",
        formData
      );

      const { imageUrl } = response.data;

      formData.append("productName", productName);
      formData.append("quantity", quantity);
      formData.append("netPrice", netPrice);
      formData.append("grossPrice", grossPrice);
      formData.append("vat", vat);

      const netPricePerQty = grossPricePerQty - (grossPricePerQty * vat) / 100;

      const newProduct = {
        productName: productName,
        quantity: quantity,
        netPrice: netPricePerQty,
        grossPrice: grossPricePerQty,
        vat: vat,
        imageUrl: imageUrl,
      };

      dispatch(addProduct(newProduct)).then(() => {
        dispatch(getProducts());
      });

      handleClose();
      setProductName("");
      setVat("");
      setNetPrice("");
      setGrossPrice("");
    } catch (error) {
      console.log(error);
    }
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
      dispatch(deleteProduct(product._id)).then(dispatch(getProducts()));
      setProductsUpdated(true);
    }
  };

  useEffect(() => {
    if (productsUpdated) {
      dispatch(getProducts());
      setProductsUpdated(false);
    }
  }, [dispatch, productsUpdated]);

  useEffect(() => {
    getProducts();
  }, [handleSubmit]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleEditPopUp = (id) => {
    setEditModal(true);
    const product = products.find((p) => p._id === id);
    setEditedProduct(product);
  };

  const popuponCancel = () => {
    setEditModal(false);
  };

  const onPopUpSave = async (e) => {
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

  function handleModalClick(event) {
    if (event.target.classList.contains("modal")) {
      popuponCancel();
    }
  }

  const onDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${editedProduct.productName}?`
    );
    if (confirmed) {
      dispatch(deleteProduct(editedProduct._id));
    }
  };

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
                <li onClick={() => handleEditPopUp(food._id)} className="food">
                  {food.productName}
                  <span className="edit-icon">
                    <AiFillEdit />
                  </span>
                </li>
              </>
            ))}
        </ul>
      </SideComponent>
      {editModal && (
        <EditComponent
          handleModalClick={handleModalClick}
          editedProduct={editedProduct}
          handleChange={handleChange}
          onDelete={onDelete}
          onPopUpSave={onPopUpSave}
          popuponCancel={onPopUpSave}
        />
      )}

      {showModal && (
        <AddProduct
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          setProductName={setProductName}
          setGrossPricePerQty={setGrossPricePerQty}
          setVat={setVat}
          setQuantity={setQuantity}
          handleFileChange={handleFileChange}
          productName={productName}
          grossPricePerQty={grossPricePerQty}
          vat={vat}
          netPrice={netPrice}
          quantity={quantity}
        />
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
                      <button className="edit" onClick={handleSave}>
                        Save
                      </button>
                      <button className="edit" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit"
                        onClick={() => handleEdit(product)}
                      >
                        <AiFillEdit />
                        Edit
                      </button>
                      <button
                        className="edit"
                        onClick={() => handleDelete(product)}
                      >
                        <AiFillDelete /> Delete
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
  height: 700px;
  margin: auto;

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

  .edit-icon {
    position: relative;
    left: 3rem;
    cursor: pointer;
  }
  ul {
    list-style: none;
    margin-top: 1rem;
  }
  ul li {
    cursor: pointer;
    padding: 1rem;
    width: 135px;
    height: 24px;
    margin: auto;
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
