import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LucideEdit3, LucideX, LucideCamera } from "lucide-react";
import "../../styles/PersonalDetail.scss";
import useAuth from "../../../auth/Hooks/useAuth";

const PersonalDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { updateUserProfile } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    Lastname: "",
    profile: null,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({ FirstName: user.FirstName, Lastname: user.Lastname });
      setPreview(user.profile);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("FirstName", formData.FirstName);
    data.append("Lastname", formData.Lastname);
    if (formData.profile) data.append("profile", formData.profile);

    await updateUserProfile(data);
    setIsModalOpen(false);
  };

  if (!user) return <div className="loading">Initializing Profile...</div>;

  return (
    <div className="profile-viewport">
      <div className="premium-card">
        <button className="edit-btn-float" onClick={() => setIsModalOpen(true)}>
          <LucideEdit3 size={18} />
        </button>

        <header className="profile-header">
          <div className="title-area">
            <h1>Account Overview</h1>
            <p className="gold-text">Premium Member</p>
          </div>
          <div className="role-badge">{user.role}</div>
        </header>

        <div className="profile-main">
          <div className="avatar-wrapper">
            <div className="image-border">
              <img src={user.profile} alt="User" />
              {user.isVerified && <span className="verified-check">✦</span>}
            </div>
            <h3>
              {user.FirstName} {user.Lastname}
            </h3>
            <span className="email-sub">{user.email}</span>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <label>Status</label>
              <p>{user.isVerified ? "Verified Account" : "Pending"}</p>
            </div>
            <div className="info-box">
              <label>Offers</label>
              <p>{user.firstOrderDiscountUsed ? "None" : "10% First Order"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <LucideX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="image-upload-section">
                <div className="preview-container">
                  <img src={preview} alt="Preview" />
                  <label htmlFor="fileInput" className="upload-label">
                    <LucideCamera size={16} />
                    <input
                      type="file"
                      id="fileInput"
                      hidden
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="Lastname"
                  value={formData.Lastname}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetail;
