import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import useWishlist from "../Hooks/useWishlist";
import useCart from "../Hooks/useCart";
import Navbar from "../components/Navbar";
import "../styles/WishlistPage.scss";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { getWishlistProducts, toggleWishlist } = useWishlist();
  const { handleAddToCart } = useCart();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWishlistProducts();
  }, []);

  // 🔥 Add to cart
  const handleAddToCartFromWishlist = async (product) => {
    try {
      await handleAddToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: product.sizes?.[0]?.size || "M",
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 search handler from navbar
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // 🔥 FILTERED DATA (IMPORTANT FIX)
  const filteredWishlist = wishlistItems?.filter((item) => {
    const product = item.product;
    if (!product) return false;

    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Navbar Search Connected */}
      <Navbar onSearch={handleSearch} onEnterSearch={() => {}} />

      <div className="wishlistContainer">
        {/* HEADER */}
        <div className="wishlistHeader">
          <button className="backBtn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <h1>My Wishlist</h1>
          <p>{wishlistItems?.length || 0} items curated for you</p>
        </div>

        {/* GRID */}
        {filteredWishlist?.length > 0 ? (
          <div className="wishlistGrid">
            {filteredWishlist.map((item) => {
              const product = item.product;
              if (!product) return null;

              return (
                <div className="wishlistCard" key={item._id}>
                  {/* IMAGE */}
                  <div className="imageWrapper">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="clickable"
                    />

                    <button
                      className="wishlistHeartBtn"
                      onClick={() => toggleWishlist(product._id)}
                    >
                      <Heart size={18} fill="red" color="red" />
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="productInfo">
                    <div
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="clickable"
                    >
                      <span className="category">{product.category}</span>
                      <h3>{product.name}</h3>
                    </div>

                    {/* PRICE + CART */}
                    <div className="priceRow">
                      <span className="price">
                        {product.currency === "INR" ? "₹" : "$"}
                        {product.price?.toLocaleString()}
                      </span>

                      <button
                        className="addToCart"
                        onClick={() => handleAddToCartFromWishlist(product)}
                      >
                        <ShoppingBag size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="emptyWishlist">
            <Heart size={60} strokeWidth={1} />
            <h2>Your collection is empty</h2>
            <p>Explore our latest arrivals and save your favorites here.</p>

            <button
              className="exploreBtn"
              onClick={() => navigate("/dashboard")}
            >
              Explore Collections
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
