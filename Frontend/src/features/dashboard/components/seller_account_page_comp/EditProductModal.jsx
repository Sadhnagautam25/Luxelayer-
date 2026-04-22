import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Trash2 } from "lucide-react";
import useProduct from "../../Hooks/useProduct";
import {
  clearSingleProduct,
  clearProductError,
} from "../../states/product.slice";
import "../../styles/EditModal.scss";

const EditProductModal = ({ productId, onClose }) => {
  const dispatch = useDispatch();

  const { handleGetSingleProduct, handleUpdateProduct } = useProduct();

  const { singleProduct, error, loading } = useSelector(
    (state) => state.product,
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    currency: "INR",
    sizes: [],
    oldImages: [],
    newImages: [],
  });

  // fetch product
  useEffect(() => {
    handleGetSingleProduct(productId);
  }, [productId]);

  // prefill form
  useEffect(() => {
    if (singleProduct?._id) {
      setFormData({
        name: singleProduct.name || "",
        description: singleProduct.description || "",
        price: singleProduct.price || "",
        stock: singleProduct.stock || "",
        category: singleProduct.category || "",
        currency: singleProduct.currency || "INR",
        sizes: singleProduct.sizes || [],
        oldImages: singleProduct.images || [],
        newImages: [],
      });
    }
  }, [singleProduct]);

  // input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // field error
  const getFieldError = (field) => {
    return error?.detail?.find((item) => item.path === field)?.msg;
  };

  // size stock change
  const handleSizeStock = (index, value) => {
    const updated = [...formData.sizes];

    updated[index] = {
      ...updated[index],
      stock: value,
    };

    setFormData((prev) => ({
      ...prev,
      sizes: updated,
    }));
  };

  // remove old image
  const removeOldImage = (index) => {
    const updated = [...formData.oldImages];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      oldImages: updated,
    }));
  };

  // add new images
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  // remove new image
  const removeNewImage = (index) => {
    const updated = [...formData.newImages];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      newImages: updated,
    }));
  };

  // close modal
  const handleClose = () => {
    dispatch(clearSingleProduct());
    dispatch(clearProductError());
    onClose();
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();

    sendData.append("name", formData.name);
    sendData.append("description", formData.description);
    sendData.append("price", formData.price);
    sendData.append("stock", formData.stock);
    sendData.append("category", formData.category);
    sendData.append("currency", formData.currency);

    sendData.append("sizes", JSON.stringify(formData.sizes));

    sendData.append("oldImages", JSON.stringify(formData.oldImages));

    formData.newImages.forEach((file) => {
      sendData.append("images", file);
    });

    const success = await handleUpdateProduct(productId, sendData);

    if (success) {
      handleClose();
    }
  };

  return (
    <div className="editModalOverlay">
      <div className="editModal">
        {/* Header */} 
        <div className="editModalHeader">
          <h2>Edit Product</h2>

          <button type="button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form className="editForm" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          {getFieldError("name") && (
            <p className="errorText">{getFieldError("name")}</p>
          )}

          {/* Description */}
          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          {getFieldError("description") && (
            <p className="errorText">{getFieldError("description")}</p>
          )}

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          {getFieldError("price") && (
            <p className="errorText">{getFieldError("price")}</p>
          )}

          {/* Stock */}
          <input
            type="text"
            name="stock"
            inputMode="numeric"
            placeholder="Total Stock"
            value={formData.stock}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              setFormData((prev) => ({
                ...prev,
                stock: value,
              }));
            }}
          />
          {getFieldError("stock") && (
            <p className="errorText">{getFieldError("stock")}</p>
          )}

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          {getFieldError("category") && (
            <p className="errorText">{getFieldError("category")}</p>
          )}

          {/* Currency */}
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>

          {getFieldError("currency") && (
            <p className="errorText">{getFieldError("currency")}</p>
          )}

          {/* Sizes */}
          <div className="sectionTitle">Product Sizes</div>

          {formData.sizes.map((item, index) => (
            <div className="sizeRow" key={item._id || index}>
              <input type="text" value={item.size} readOnly />

              <input
                type="number"
                value={item.stock}
                onChange={(e) => handleSizeStock(index, e.target.value)}
              />
            </div>
          ))}

          {getFieldError("sizes") && (
            <p className="errorText">{getFieldError("sizes")}</p>
          )}

          {/* Existing Images */}
          <div className="sectionTitle">Current Images</div>

          <div className="imageGrid">
            {formData.oldImages.map((img, index) => (
              <div className="imgCard" key={index}>
                <img src={img} alt="product" />

                <button type="button" onClick={() => removeOldImage(index)}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* Upload New Images */}
          <input type="file" multiple onChange={handleNewImages} />

          {/* New Preview */}
          <div className="imageGrid">
            {formData.newImages.map((file, index) => (
              <div className="imgCard" key={index}>
                <img src={URL.createObjectURL(file)} alt="" />

                <button type="button" onClick={() => removeNewImage(index)}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="updateBtn" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
