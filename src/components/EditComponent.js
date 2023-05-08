import React from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneSave } from "react-icons/ai";

const EditComponent = ({
  handleModalClick,
  editedProduct,
  handleChange,
  onDelete,
  onPopUpSave,
  popuponCancel,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="modal" onClick={handleModalClick}>
        <div className="model-inner">
          <form>
            <h2>Edit Product</h2>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={editedProduct && editedProduct.productName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="vat">VAT:</label>
              <input
                type="number"
                id="vat"
                name="vat"
                value={editedProduct && editedProduct.vat}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={editedProduct && editedProduct.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="netPrice">Net Price:</label>
              <input
                type="number"
                id="netPrice"
                name="netPrice"
                value={editedProduct && editedProduct.netPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="grossPrice">Gross Price:</label>
              <input
                type="number"
                id="grossPrice"
                name="grossPrice"
                value={editedProduct && editedProduct.grossPrice}
                onChange={handleChange}
              />
            </div>

            <button type="button" className="small-button" onClick={onDelete}>
              <AiFillDelete /> Delete
            </button>

            <button
              type="button"
              className="small-button"
              onClick={onPopUpSave}
            >
              <AiTwotoneSave style={{ position: "relative", top: "2px" }} />
              Save
            </button>
            <button
              type="button"
              className="small-button"
              onClick={popuponCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditComponent;
