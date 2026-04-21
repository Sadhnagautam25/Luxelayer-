import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/SellerBusinessPage.scss";
import SellerSettingPage from "../components/seller_account_page_comp/sellerSettingPage";
import useSeller from "../Hooks/useSeller";
import { useNavigate } from "react-router-dom";
import { clearSeller } from "../states/seller.slice";
import LoadingLoader from "../components/LoadingLoder";
import useProduct from "../Hooks/useProduct";
import { Pencil } from "lucide-react";
import EditProductModal from "../components/seller_account_page_comp/EditProductModal";

const SellerBusinessPage = () => {
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const sellerDetail = useSelector((state) => state.seller.sellerDetail);

  // 🔥 Redux products state
  const myProducts = useSelector((state) => state.product.myProducts || []);

  const [activeTab, setActiveTab] = useState("shop");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { handleDeleteSellerAccount } = useSeller();
  const { handleGetMyProducts } = useProduct();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Fetch My Products
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        await handleGetMyProducts();
      } catch (error) {
        console.log(error);
      }
    };

    // first time run
    fetchMyProducts();

    // every 3 sec run
    const interval = setInterval(() => {
      fetchMyProducts();
    }, 3000);

    // cleanup
    return () => clearInterval(interval);
  }, []);
  const openDeletePopup = () => {
    setShowDeletePopup(true);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  const confirmDeleteAccount = async () => {
    try {
      const res = await handleDeleteSellerAccount();

      if (res?.success) {
        dispatch(clearSeller());
        setShowDeletePopup(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!sellerDetail) {
    return (
      <div className="loading-state">
        <LoadingLoader />
      </div>
    );
  }

  const openEditModal = (id) => {
    setSelectedProductId(id);
    setIsOpenEditProduct(true);
  };

  return (
    <>
      <div className="seller-dashboard">
        {/* NAVIGATION */}
        <nav className="dashboard-tabs">
          <button
            className={activeTab === "shop" ? "active" : ""}
            onClick={() => setActiveTab("shop")}
          >
            My Brand Shop
          </button>

          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Account Settings
          </button>
        </nav>

        {/* SHOP TAB */}
        {activeTab === "shop" ? (
          <div className="shop-view-container">
            {/* HEADER */}
            <header className="shop-header">
              <div className="banner-wrapper">
                <img
                  src={sellerDetail.bannerImage}
                  alt="Banner"
                  className="shop-banner"
                />
                <div className="banner-overlay"></div>
              </div>

              <div className="header-content">
                <div className="logo-container">
                  <img
                    src={sellerDetail.logo}
                    alt="Logo"
                    className="shop-logo"
                  />
                </div>

                <div className="brand-meta">
                  <h1>{sellerDetail.businessName}</h1>

                  <p className="description">
                    {sellerDetail.businessDescription}
                  </p>

                  <span className="location">
                    📍 {sellerDetail.address?.city},{" "}
                    {sellerDetail.address?.country}
                  </span>
                </div>

                <button
                  className="create-product-btn"
                  onClick={() => navigate("/create-product-page")}
                >
                  ＋ New Product
                </button>
              </div>
            </header>

            {/* STATS */}
            <section className="analytics-bar">
              <div className="stat-card">
                <label>Products</label>
                <span className="value">{myProducts.length}</span>
              </div>

              <div className="stat-card">
                <label>Status</label>
                <span className="value active">Live</span>
              </div>

              <div className="stat-card">
                <label>Contact</label>
                <span className="value email">{sellerDetail.contactEmail}</span>
              </div>
            </section>

            {/* PRODUCTS */}
            <main className="product-management">
              <div className="section-header">
                <h2>Inventory Management</h2>
                <div className="gold-line"></div>
              </div>

              <div className="product-grid">
                {myProducts.length > 0 ? (
                  myProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <div className="image-box">
                        <img src={product.images?.[0]} alt={product.name} />

                        <div className="hover-overlay">
                          <div
                            className="edit-pen"
                            onClick={() => openEditModal(product._id)}
                          >
                            <Pencil size={18} />
                          </div>
                          <button
                            className="detail-btn"
                            onClick={() => navigate(`/product/${product._id}`)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      <div className="info-box">
                        <h3>{product.name}</h3>

                        <p className="price">
                          {product.currency} {product.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <h3>No Products Found</h3>
                    <p>Create your first product now.</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        ) : (
          <SellerSettingPage handleDeleteAccount={openDeletePopup} />
        )}
      </div>

      {isOpenEditProduct && (
        <EditProductModal
          productId={selectedProductId}
          onClose={() => setIsOpenEditProduct(false)}
        />
      )}

      {/* DELETE POPUP */}
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="delete-box">
            <h3>⚠️ Delete Account</h3>

            <p>Are you sure? This action is permanent and cannot be undone.</p>

            <div className="btn-group">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>

              <button className="delete-btn" onClick={confirmDeleteAccount}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerBusinessPage;
