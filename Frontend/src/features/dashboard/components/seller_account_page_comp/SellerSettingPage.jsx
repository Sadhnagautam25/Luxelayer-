import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/SellerSettingPage.scss";
import { useSeller } from "../../Hooks/useSeller";

const SellerSettingPage = ({ handleDeleteAccount }) => {
  const { handleUpdateSellerAccount } = useSeller();
  const [showPopup, setShowPopup] = useState(false);

  const seller = useSelector((state) => state.seller.sellerDetail);
  const { error } = useSelector((state) => state.seller);

  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    contactEmail: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    logo: null,
    bannerImage: null,
  });

  const [previews, setPreviews] = useState({
    logo: "",
    bannerImage: "",
  });

  // ✅ Prefill data
  useEffect(() => {
    if (seller) {
      setFormData({
        businessName: seller.businessName || "",
        businessDescription: seller.businessDescription || "",
        contactEmail: seller.contactEmail || "",
        phone: seller.phone || "",
        street: seller.address?.street || "",
        city: seller.address?.city || "",
        state: seller.address?.state || "",
        country: seller.address?.country || "",
        zipCode: seller.address?.zipCode || "",
        logo: null,
        bannerImage: null,
      });

      setPreviews({
        logo: seller.logo || "",
        bannerImage: seller.bannerImage || "",
      });
    }
  }, [seller]);

  // ✅ Convert backend errors → field errors
  useEffect(() => {
    if (error?.detail) {
      const formatted = {};

      error.detail.forEach((err) => {
        const field = err.field.split(".").pop();

        if (!formatted[field]) {
          formatted[field] = err.message;
        }
      });

      setFieldErrors(formatted);
    }
  }, [error]);

  // ✅ Cleanup preview URLs (memory leak fix)
  useEffect(() => {
    return () => {
      if (previews.logo?.startsWith("blob:")) {
        URL.revokeObjectURL(previews.logo);
      }
      if (previews.bannerImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previews.bannerImage);
      }
    };
  }, [previews]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // 🔥 remove error cleanly
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    if (files && files[0]) {
      const file = files[0];

      setFormData((prev) => ({ ...prev, [name]: file }));

      const objectUrl = URL.createObjectURL(file);

      setPreviews((prev) => ({
        ...prev,
        [name]: objectUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Submit update (FINAL)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({});

    try {
      const data = new FormData();

      // ✅ Only send trimmed values
      data.append("businessName", formData.businessName.trim());
      data.append("businessDescription", formData.businessDescription.trim());
      data.append("contactEmail", formData.contactEmail.trim());
      data.append("phone", formData.phone.trim());

      // ✅ Always send proper address object
      const addressObj = {
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim(),
        zipCode: formData.zipCode.trim(),
      };

      data.append("address", JSON.stringify(addressObj));

      // ✅ Only append files if exist
      if (formData.logo instanceof File) {
        data.append("logo", formData.logo);
      }

      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      await handleUpdateSellerAccount(data);

      // ✅ Clear errors after success
      setFieldErrors({});

      setShowPopup(true);

      console.log("Updated Successfully ✅");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <>
      <div className="settings-view-container">
        <div className="settings-card">
          <div className="settings-header">
            <div className="header-text">
              <h2>Brand Configuration</h2>
              <p>Update your business details and management settings.</p>
            </div>
            <button
              type="submit"
              form="seller-settings-form"
              className="update-btn"
            >
              Save Changes
            </button>
          </div>

          {/* 🔥 GLOBAL ERROR */}
          {error?.message && <div className="form-error">{error.message}</div>}

          <form
            id="seller-settings-form"
            className="edit-business-form"
            onSubmit={handleSubmit}
          >
            <section className="form-section">
              <h4 className="section-title">General Information</h4>

              <div className="form-row">
                {/* 🔹 BUSINESS NAME */}
                <div className="input-group">
                  <label>Legal Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={fieldErrors.businessName ? "error-input" : ""}
                  />
                  {fieldErrors.businessName && (
                    <span className="error-text">
                      {fieldErrors.businessName}
                    </span>
                  )}
                </div>

                {/* 🔹 EMAIL */}
                <div className="input-group">
                  <label>Official Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={fieldErrors.contactEmail ? "error-input" : ""}
                  />
                  {fieldErrors.contactEmail && (
                    <span className="error-text">
                      {fieldErrors.contactEmail}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* 🔹 PHONE */}
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={fieldErrors.phone ? "error-input" : ""}
                  />
                  {fieldErrors.phone && (
                    <span className="error-text">{fieldErrors.phone}</span>
                  )}
                </div>
              </div>

              {/* 🔹 DESCRIPTION */}
              <div className="input-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  className={
                    fieldErrors.businessDescription ? "error-input" : ""
                  }
                />
                {fieldErrors.businessDescription && (
                  <span className="error-text">
                    {fieldErrors.businessDescription}
                  </span>
                )}
              </div>
            </section>

            <section className="form-section">
              <h4 className="section-title">Business Address</h4>

              <div className="form-row three-col">
                {/* 🔹 STREET */}
                <div className="input-group">
                  <label>Street</label>
                  <input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className={fieldErrors.street ? "error-input" : ""}
                  />
                  {fieldErrors.street && (
                    <span className="error-text">{fieldErrors.street}</span>
                  )}
                </div>

                {/* 🔹 CITY */}
                <div className="input-group">
                  <label>City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={fieldErrors.city ? "error-input" : ""}
                  />
                  {fieldErrors.city && (
                    <span className="error-text">{fieldErrors.city}</span>
                  )}
                </div>

                {/* 🔹 ZIP */}
                <div className="input-group">
                  <label>Zip Code</label>
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={fieldErrors.zipCode ? "error-input" : ""}
                  />
                  {fieldErrors.zipCode && (
                    <span className="error-text">{fieldErrors.zipCode}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* 🔹 STATE */}
                <div className="input-group">
                  <label>State</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={fieldErrors.state ? "error-input" : ""}
                  />
                  {fieldErrors.state && (
                    <span className="error-text">{fieldErrors.state}</span>
                  )}
                </div>

                {/* 🔹 COUNTRY */}
                <div className="input-group">
                  <label>Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={fieldErrors.country ? "error-input" : ""}
                  />
                  {fieldErrors.country && (
                    <span className="error-text">{fieldErrors.country}</span>
                  )}
                </div>
              </div>
            </section>

            <section className="form-section">
              <h4 className="section-title">Brand Assets</h4>

              <div className="image-upload-grid">
                {/* LOGO */}
                <div className="upload-box">
                  <label>Brand Logo</label>
                  <div className="preview-container logo-circle">
                    <img src={previews.logo || "placeholder-url"} alt="Logo" />
                    <label htmlFor="logo-upload" className="overlay-btn">
                      Change
                    </label>
                  </div>
                  <input
                    type="file"
                    id="logo-upload"
                    name="logo"
                    hidden
                    onChange={handleChange}
                  />
                </div>

                {/* BANNER */}
                <div className="upload-box banner-box">
                  <label>Brand Banner</label>
                  <div className="preview-container banner-rect">
                    <img
                      src={previews.bannerImage || "placeholder-url"}
                      alt="Banner"
                    />
                    <label htmlFor="banner-upload" className="overlay-btn">
                      Change Banner
                    </label>
                  </div>
                  <input
                    type="file"
                    id="banner-upload"
                    name="bannerImage"
                    hidden
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
          </form>

          {/* 🔥 DANGER ZONE (unchanged) */}
          <div className="danger-zone">
            <div className="danger-text">
              <h3>Danger Zone</h3>
              <p>
                Deleting your account is permanent. All brand data will be
                wiped.
              </p>
            </div>
            <button onClick={handleDeleteAccount} className="delete-brand-btn">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="success-popup">
          <div className="popup-box">
            <h3>
              <span style={{ color: "#c5a059" }}>✦</span>
              Update Successful
            </h3>
            <p>Your brand configuration has been securely saved and updated.</p>
            <button onClick={() => setShowPopup(false)}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerSettingPage;
