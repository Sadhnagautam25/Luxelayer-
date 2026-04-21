import React, { useMemo, useState, useEffect } from "react";
import "../styles/SellerCreateProductPage.scss";
import useProduct from "../Hooks/useProduct";
import { useSelector } from "react-redux";

const SellerCreateProductPage = () => {
  const { handleCreateProduct } = useProduct();
  const error = useSelector((state) => state.product.error);
  const loading = useSelector((state) => state.product.loading);

  const initialForm = {
    name: "",
    description: "",
    price: "",
    category: "", // ✅ Added Category
    currency: "INR",
  };

  const initialSizes = [
    { size: "S", stock: "" },
    { size: "M", stock: "" },
    { size: "L", stock: "" },
    { size: "XL", stock: "" },
  ];

  const [form, setForm] = useState(initialForm);
  const [sizes, setSizes] = useState(initialSizes);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  const totalSizeStock = useMemo(() => {
    return sizes.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  }, [sizes]);

  useEffect(() => {
    if (error?.detail?.length > 0) {
      const formattedErrors = {};
      error.detail.forEach((item) => {
        formattedErrors[item.path] = item.msg;
      });
      setFieldErrors(formattedErrors);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSizeChange = (index, value) => {
    const updated = [...sizes];
    updated[index].stock = value;
    setSizes(updated);
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);

    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  };

  const resetForm = () => {
    setForm(initialForm);
    setSizes(initialSizes);
    setImages([]);
    setPreviews([]);
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("stock", totalSizeStock);
    formData.append(
      "sizes",
      JSON.stringify(
        sizes.map((s) => ({ size: s.size, stock: Number(s.stock) || 0 })),
      ),
    );
    images.forEach((img) => formData.append("images", img));

    const res = await handleCreateProduct(formData);
    if (res) {
      alert("Product created successfully!");
      resetForm();
    }
  };

  return (
    <div className="seller-container">
      {/* LEFT: FORM SECTION */}
      <div className="create-product-section">
        <form onSubmit={handleSubmit} className="product-form">
          <header>
            <h2>Create New Product</h2>
            <p>List your luxury items in the marketplace.</p>
          </header>

          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Premium Silk Saree"
              className={fieldErrors.name ? "error-border" : ""}
            />
            {fieldErrors.name && (
              <p className="field-error">{fieldErrors.name}</p>
            )}
          </div>

          <div className="input-group">
            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
              <option value="home_beauty">Home & Beauty</option>
            </select>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product details..."
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
            <div className="input-group">
              <label>Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="AUD">A$ AUD</option>
                <option value="CAD">C$ CAD</option>
              </select>
            </div>
          </div>

          <div className="sizes-box">
            <label>Sizes & Stock (Total: {totalSizeStock})</label>
            <div className="size-grid">
              {sizes.map((s, i) => (
                <div key={i} className="size-item">
                  <span>{s.size}</span>
                  <input
                    type="number"
                    value={s.stock}
                    onChange={(e) => handleSizeChange(i, e.target.value)}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD WITH FILENAMES */}
          <div className="upload-box">
            <label className="file-label">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />
              <div className="upload-ui">
                <span>
                  {images.length > 0
                    ? `${images.length} Files Selected`
                    : "Click to upload product images"}
                </span>
                <div className="file-names-list">
                  {images.map((file, idx) => (
                    <small key={idx}>
                      {file.name}
                      {idx !== images.length - 1 ? ", " : ""}
                    </small>
                  ))}
                </div>
              </div>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Publishing..." : "Create Product"}
          </button>
        </form>
      </div>

      {/* RIGHT: LIVE PREVIEW SECTION */}
      <div className="preview-section">
        <div className="sticky-preview">
          <h3>Live Preview</h3>
          <div className="product-card-preview">
            {/* All 5 Images Preview Grid */}
            <div className="image-preview-grid">
              {previews.length > 0 ? (
                previews.map((url, index) => (
                  <div
                    key={index}
                    className={`preview-img-wrapper img-${index}`}
                  >
                    <img src={url} alt={`Preview ${index}`} />
                  </div>
                ))
              ) : (
                <div className="placeholder-img">No Images Selected</div>
              )}
            </div>

            <div className="preview-info">
              <span className="p-category">{form.category || "Category"}</span>
              <h4 className="p-name">{form.name || "Product Title"}</h4>
              <p className="p-price">
                {form.currency} {form.price || "0.00"}
              </p>
              <div className="p-sizes">
                {sizes.map((s) => (
                  <span key={s.size} className={s.stock > 0 ? "active" : ""}>
                    {s.size}
                  </span>
                ))}
              </div>
              <p className="p-desc">
                {form.description || "Description will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCreateProductPage;
