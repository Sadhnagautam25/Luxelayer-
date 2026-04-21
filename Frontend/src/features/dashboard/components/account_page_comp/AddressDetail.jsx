import React, { useEffect, useState } from "react";
import useAddress from "../../Hooks/useAddress";
import "../../styles/AddressDetail.scss";

const AddressDetail = () => {
  const {
    addresses,
    fetchMyAddresses,
    handleCreateAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    handleUpdateAddress,
    loading,
    error, // Expected format: [{path: 'email', msg: '...'}, ...]
  } = useAddress();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMyAddresses();
  }, []);

  // Helper function to find specific field error
  const getFieldError = (fieldName) => {
    if (Array.isArray(error)) {
      const fieldErr = error.find((err) => err.path === fieldName);
      return fieldErr ? fieldErr.msg : null;
    }
    return null;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic frontend validation
    if (!form.fullName || !form.phone || !form.address) {
      alert("Please fill required fields");
      return;
    }

    const success = await handleCreateAddress(form);
    // Agar api response me error nahi hai tabhi form reset karein
    if (success) {
      resetForm();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const success = await handleUpdateAddress(editId, form);

    if (success) {
      setShowModal(false);
      setEditId(null);
      resetForm();
    }
  };

  return (
    <>
      <div className="address-page">
        <h2>Manage Address</h2>
        <p>Edit your shipping and billing locations.</p>

        {/* Global Error (if any non-field error exists) */}
        {error && typeof error === "string" && (
          <div className="error-box">{error}</div>
        )}

        <div className="address-list">
          {addresses?.map((addr) => (
            <div key={addr._id} className="address-card">
              <h4>
                {addr.fullName}{" "}
                {addr.isDefault && <span className="badge">Default</span>}
              </h4>
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state} - {addr.zipCode}
              </p>
              <p>{addr.phone}</p>

              <div className="actions">
                <button onClick={() => handleSetDefaultAddress(addr._id)}>
                  Set Default
                </button>
                <button onClick={() => handleDeleteAddress(addr._id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditId(addr._id);
                    setForm({ ...addr });
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE FORM */}
        <div className="address-form">
          <h3>Add New Address</h3>
          <form onSubmit={handleSubmit}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
            {getFieldError("fullName") && (
              <span className="error-msg">{getFieldError("fullName")}</span>
            )}

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {getFieldError("email") && (
              <span className="error-msg">{getFieldError("email")}</span>
            )}

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            {getFieldError("phone") && (
              <span className="error-msg">{getFieldError("phone")}</span>
            )}

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            {getFieldError("address") && (
              <span className="error-msg">{getFieldError("address")}</span>
            )}

            <div className="row">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <input
              name="zipCode"
              placeholder="Zip Code"
              value={form.zipCode}
              onChange={handleChange}
            />
            {getFieldError("zipCode") && (
              <span className="error-msg">{getFieldError("zipCode")}</span>
            )}

            <label>
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm({ ...form, isDefault: e.target.checked })
                }
              />
              Make this default address
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Address"}
            </button>
          </form>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Address</h3>
            <form onSubmit={handleUpdate}>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              {getFieldError("fullName") && (
                <span className="error-msg">{getFieldError("fullName")}</span>
              )}

              <input name="email" value={form.email} onChange={handleChange} />
              {getFieldError("email") && (
                <span className="error-msg">{getFieldError("email")}</span>
              )}

              <input name="phone" value={form.phone} onChange={handleChange} />
              {getFieldError("phone") && (
                <span className="error-msg">{getFieldError("phone")}</span>
              )}

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              {getFieldError("address") && (
                <span className="error-msg">{getFieldError("address")}</span>
              )}

              <input name="city" value={form.city} onChange={handleChange} />
              <input name="state" value={form.state} onChange={handleChange} />
              <input
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
              />
              {getFieldError("zipCode") && (
                <span className="error-msg">{getFieldError("zipCode")}</span>
              )}

              <label>
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm({ ...form, isDefault: e.target.checked })
                  }
                />
                Make Default
              </label>

              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressDetail;
