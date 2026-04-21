import React, { useEffect, useState } from "react";
import { User, ShoppingBag, Heart, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.scss";
import useCart from "../Hooks/useCart";

const Navbar = ({ onSearch, onEnterSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { handleGetCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      await handleGetCart();
    };

    fetchCart();
  }, [handleGetCart]);

  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Left Section: Desktop Links only */}
          <div className="nav-section desktop-only">
            <ul className="nav-links">
              <li
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                New
              </li>
              <li
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Collections
              </li>
            </ul>
          </div>

          {/* Center Section: Logo */}
          <div className="nav-logo">
            <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              LUXELAYER
            </h1>
          </div>

          {/* Right Section: Icons */}
          <div className="nav-section right">
            <Search
              className="icon"
              size={20}
              onClick={() => setShowSearch(!showSearch)}
            />
            <Heart
              onClick={() => navigate("/wishlist")}
              className="icon"
              size={20}
            />
            <div
              className="cart-wrapper"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ShoppingBag className="icon" size={20} />
              <span className="cart-count">{cartCount || 0}</span>
            </div>
            <User
              className="icon"
              size={20}
              onClick={() => navigate("/account")}
            />
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="search-box">
          <div className="search-inner">
            <input
              autoFocus
              type="text"
              placeholder="What are you looking for?"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                onSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEnterSearch();
                }
              }}
            />

            {/* Premium Close Button with Icon */}
            <button
              className="close-search"
              onClick={() => setShowSearch(false)}
            >
              <span>Close</span>
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
