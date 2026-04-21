import React, { useEffect, useState } from "react";
import "../../styles/CreateBusinessAccount.scss";
import { useSeller } from "../../Hooks/useSeller";
import { useSelector } from "react-redux";
import CongratsPage from "./Congrats";

const CreateBusinessAccount = () => {
  const { handleCreateSellerAccount } = useSeller();

  const sellerDetail = useSelector((state) => state.seller.sellerDetail);
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
    logo: null,
    bannerImage: null,
  });

  // ✅ MAP BACKEND ERRORS → FIELD ERRORS
  useEffect(() => {
    if (error?.detail) {
      const formatted = {};

      error.detail.forEach((err) => {
        const field = err.field.split(".").pop();

        // only first error per field (clean UI)
        if (!formatted[field]) {
          formatted[field] = err.message;
        }
      });

      setFieldErrors(formatted);
    } else {
      // 🔥 important (clear stale errors)
      setFieldErrors({});
    }
  }, [error]);

  // ✅ CLEANUP OBJECT URLS (MEMORY SAFE)
  useEffect(() => {
    return () => {
      if (previews.logo) URL.revokeObjectURL(previews.logo);
      if (previews.bannerImage) URL.revokeObjectURL(previews.bannerImage);
    };
  }, [previews]);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // 🔥 remove error instantly
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

    if (files && files[0]) {
      const file = files[0];

      // revoke old preview (important)
      if (previews[name]) {
        URL.revokeObjectURL(previews[name]);
      }

      const objectUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setPreviews((prev) => ({
        ...prev,
        [name]: objectUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value.trimStart(), // 🔥 better UX
      }));
    }
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({}); // reset errors

    try {
      const data = new FormData();

      // 🔹 BASIC FIELDS
      data.append("businessName", formData.businessName.trim());
      data.append("businessDescription", formData.businessDescription.trim());
      data.append("contactEmail", formData.contactEmail.trim());
      data.append("phone", formData.phone.trim());

      // 🔥 DIRECT NESTED ADDRESS (NO JSON)
      data.append("address[street]", formData.street.trim());
      data.append("address[city]", formData.city.trim());
      data.append("address[state]", formData.state.trim());
      data.append("address[country]", formData.country.trim());
      data.append("address[zipCode]", formData.zipCode.trim());

      // 🔹 FILES
      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      if (formData.bannerImage) {
        data.append("bannerImage", formData.bannerImage);
      }

      // 🔥 DEBUG (optional but useful)
      // for (let pair of data.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      await handleCreateSellerAccount(data);

      console.log("Business Account Created ✅");

      // 🔹 clear errors
      setFieldErrors({});

      // 🔹 reset form
      setFormData({
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

      // 🔹 reset previews
      setPreviews({
        logo: null,
        bannerImage: null,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return sellerDetail ? (
    <CongratsPage />
  ) : (
    <div className="business-container">
      <form className="business-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Create Business Account</h2>
          <p className="subtitle">
            Join the Luxelayer collective and reach a global audience.
          </p>
        </div>

        {/* 🔥 GLOBAL ERROR */}
        {error?.message && <div className="form-error">{error.message}</div>}

        <div className="form-section-title">Brand Identity</div>

        <div>
          <input
            type="text"
            name="businessName"
            placeholder="Legal Business Name"
            onChange={handleChange}
            className={fieldErrors.businessName ? "error-input" : ""}
          />
          {fieldErrors.businessName && (
            <span className="error-text">{fieldErrors.businessName}</span>
          )}
        </div>

        <div>
          <textarea
            name="businessDescription"
            placeholder="Describe your brand's heritage..."
            onChange={handleChange}
            className={fieldErrors.businessDescription ? "error-input" : ""}
          />
          {fieldErrors.businessDescription && (
            <span className="error-text">
              {fieldErrors.businessDescription}
            </span>
          )}
        </div>

        <div className="form-section-title">Contact Information</div>

        <div className="address-group">
          <div>
            <input
              type="email"
              name="contactEmail"
              placeholder="Official Email"
              onChange={handleChange}
              className={fieldErrors.contactEmail ? "error-input" : ""}
            />
            {fieldErrors.contactEmail && (
              <span className="error-text">{fieldErrors.contactEmail}</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className={fieldErrors.phone ? "error-input" : ""}
            />
            {fieldErrors.phone && (
              <span className="error-text">{fieldErrors.phone}</span>
            )}
          </div>
        </div>

        <div className="form-section-title">Physical Presence</div>

        <div className="address-group">
          <div>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              onChange={handleChange}
              className={fieldErrors.street ? "error-input" : ""}
            />
            {fieldErrors.street && (
              <span className="error-text">{fieldErrors.street}</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className={fieldErrors.city ? "error-input" : ""}
            />
            {fieldErrors.city && (
              <span className="error-text">{fieldErrors.city}</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="state"
              placeholder="State / Province"
              onChange={handleChange}
              className={fieldErrors.state ? "error-input" : ""}
            />
            {fieldErrors.state && (
              <span className="error-text">{fieldErrors.state}</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              className={fieldErrors.country ? "error-input" : ""}
            />
            {fieldErrors.country && (
              <span className="error-text">{fieldErrors.country}</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="zipCode"
              placeholder="Postal Code"
              onChange={handleChange}
              className={fieldErrors.zipCode ? "error-input" : ""}
            />
            {fieldErrors.zipCode && (
              <span className="error-text">{fieldErrors.zipCode}</span>
            )}
          </div>
        </div>

        <div className="form-section-title">Visual Assets</div>

        <div className="upload-grid">
          {/* LOGO */}
          <div className="file-upload-box">
            <label>Brand Logo</label>
            <div
              className={`custom-upload ${previews.logo ? "has-preview" : ""}`}
            >
              <input
                type="file"
                name="logo"
                id="logo-upload"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="logo-upload" className="upload-label-wrapper">
                {previews.logo ? (
                  <div className="preview-container">
                    <img src={previews.logo} alt="Logo Preview" />
                    <div className="change-overlay">Change Logo</div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <span className="upload-icon">＋</span>
                    <span className="upload-text">Upload Logo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* BANNER */}
          <div className="file-upload-box">
            <label>Store Banner</label>
            <div
              className={`custom-upload ${
                previews.bannerImage ? "has-preview" : ""
              }`}
            >
              <input
                type="file"
                name="bannerImage"
                id="banner-upload"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="banner-upload" className="upload-label-wrapper">
                {previews.bannerImage ? (
                  <div className="preview-container">
                    <img src={previews.bannerImage} alt="Banner Preview" />
                    <div className="change-overlay">Change Banner</div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <span className="upload-icon">＋</span>
                    <span className="upload-text">Upload Banner</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Initialize Brand Account
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessAccount;
