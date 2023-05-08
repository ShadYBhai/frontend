import React from "react";

const AddProduct = ({
  handleModalClose,
  handleSubmit,
  setProductName,
  setGrossPricePerQty,
  setVat,
  setQuantity,
  handleFileChange,
  productName,
  grossPricePerQty,
  vat,
  netPrice,
  quantity,
}) => {
  return (
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

          {/* <button className="file" type="submit">
            <input
              className="file-upload"
              type="file"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg"
              required
            />
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
