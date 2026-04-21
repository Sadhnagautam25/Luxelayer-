import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { clearSingleProduct } from "../states/product.slice";
import useProduct from "../Hooks/useProduct";
import useCart from "../Hooks/useCart";
import useWishlist from "../Hooks/useWishlist";

import Navbar from "../components/Navbar";
import "../styles/ProductVeiw.scss";

const ProductVeiw = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleGetSingleProduct } = useProduct();
  const { handleAddToCart } = useCart();
  const { toggleWishlist, getWishlistProducts } = useWishlist();

  const singleProduct = useSelector((state) => state.product.singleProduct);

  const similarProducts = useSelector((state) => state.product.similarProducts);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    getWishlistProducts();

    const fetchProduct = async () => {
      try {
        await handleGetSingleProduct(id);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProduct();
  }, [id]);

  // ---------------- SET MAIN IMAGE ----------------
  useEffect(() => {
    if (singleProduct?.images?.length > 0) {
      setMainImage(singleProduct.images[0]);
    }
  }, [singleProduct]);

  // ---------------- WISHLIST CHECK ----------------
  const isWishlisted = wishlistItems?.some(
    (item) => item.product?._id?.toString() === id,
  );

  // ---------------- IMAGE NAVIGATION ----------------
  const nextImage = () => {
    if (!singleProduct?.images?.length) return;

    const currentIndex = singleProduct.images.indexOf(mainImage);

    const nextIndex = (currentIndex + 1) % singleProduct.images.length;

    setMainImage(singleProduct.images[nextIndex]);
  };

  const prevImage = () => {
    if (!singleProduct?.images?.length) return;

    const currentIndex = singleProduct.images.indexOf(mainImage);

    const prevIndex =
      (currentIndex - 1 + singleProduct.images.length) %
      singleProduct.images.length;

    setMainImage(singleProduct.images[prevIndex]);
  };

  // ---------------- ADD TO CART ----------------
  const addToCartHandler = async () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    console.log("AddToCart Data:", {
      product: singleProduct._id,
      selectedSize,
    });
    try {
      await handleAddToCart({
        product: singleProduct._id,
        name: singleProduct.name,
        price: singleProduct.price,
        image: singleProduct.images?.[0],
        size: selectedSize,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // ---------------- LOADER ----------------
  if (!singleProduct) return <div className="loader">LUXELAYER</div>;

  return (
    <div className="product-page">
      <Navbar />

      <main className="product-view-container">
        {/* BACK BUTTON */}
        <header className="view-header">
          <button
            className="back-btn"
            onClick={() => {
              dispatch(clearSingleProduct());
              navigate(-1);
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
        </header>

        <div className="product-wrapper">
          {/* LEFT IMAGE SECTION */}
          <section className="image-section">
            <div className="main-stage">
              <img
                src={mainImage}
                alt={singleProduct.name}
                className="fade-in"
              />

              <button className="nav-arrow prev" onClick={prevImage}>
                <ChevronLeft />
              </button>

              <button className="nav-arrow next" onClick={nextImage}>
                <ChevronRight />
              </button>
            </div>

            <div className="thumbnail-strip">
              {singleProduct.images?.map((img, index) => (
                <div
                  key={index}
                  className={`thumb ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="thumb" />
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT DETAILS SECTION */}
          <section className="details-section">
            <div className="sticky-content">
              <div className="brand-header">
                <span className="category">{singleProduct.category}</span>

                <h1 className="title">{singleProduct.name}</h1>

                <p className="seller">
                  By {singleProduct.seller?.businessName}
                </p>
              </div>

              <div className="price-tag">
                {singleProduct.currency} {singleProduct.price?.toLocaleString()}
              </div>

              <div className="description">
                <p>{singleProduct.description}</p>
              </div>

              {/* SIZE SELECT */}
              <div className="selectors">
                <div className="size-group">
                  <div className="label">Select Size</div>

                  <div className="chips">
                    {singleProduct.sizes?.map((s, i) => (
                      <button
                        key={i}
                        className={`size-chip ${
                          selectedSize === s.size ? "active" : ""
                        }`}
                        onClick={() => setSelectedSize(s.size)}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="cta-block">
                <button
                  className="add-to-cart-btn"
                  onClick={addToCartHandler}
                  disabled={!selectedSize}
                >
                  <ShoppingBag size={20} /> Add to Bag
                </button>

                <button
                  className={`wish-btn ${isWishlisted ? "active" : ""}`}
                  onClick={() => toggleWishlist(id)}
                >
                  <Heart
                    size={22}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* TRUST */}
              <footer className="trust-footer">
                <div className="item">
                  <Truck size={18} /> Complimentary Shipping
                </div>

                <div className="item">
                  <ShieldCheck size={18} /> Verified Authenticity
                </div>
              </footer>
            </div>
          </section>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts?.length > 0 && (
          <section className="similar-section">
            <h2 className="section-title">You May Also Like</h2>

            <div className="similar-grid">
              {similarProducts.map((item) => (
                <div
                  key={item._id}
                  className="similar-card"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <div className="card-img">
                    <img src={item.images?.[0]} alt={item.name} />
                  </div>

                  <div className="card-info">
                    <h4>{item.name}</h4>
                    <p>
                      {item.currency} {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductVeiw;
