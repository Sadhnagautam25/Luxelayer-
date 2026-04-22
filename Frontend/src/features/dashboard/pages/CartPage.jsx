import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCart from "../Hooks/useCart";
import "../styles/CartPage.scss";
import {
  Trash2,
  Minus,
  Plus,
  X,
  ShoppingBag,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    handleGetCart,
    handleIncrease,
    handleDecrease,
    handleRemoveFromCart,
  } = useCart();
  const { cartItems = [] } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
  }, []);

  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const filteredItems = cartItems?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-main-content">
            <h1 className="page-title">Shopping Bag</h1>

            {/* TABLE HEADER - Visible on Desktop */}
            <div className="cart-table-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-subtotal">Subtotal</span>
            </div>

            <div className="cart-items-wrapper">
              {filteredItems.map((item) => {
                const productId =
                  typeof item.product === "object"
                    ? item.product._id
                    : item.product;

                return (
                  <div className="cart-item-row" key={item._id}>
                    {/* PRODUCT SECTION */}
                    <div className="product-cell">
                      <div
                        className="image-container"
                        onClick={() => navigate(`/product/${productId}`)}
                      >
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="details">
                        <span className="brand-tag">LuxeLayer</span>
                        <h3 onClick={() => navigate(`/product/${productId}`)}>
                          {item.name}
                        </h3>
                        <p className="item-meta">
                          Size: <span>{item.size}</span>
                        </p>
                      </div>
                    </div>

                    {/* PRICE - Hidden on very small mobile, visible in card elsewhere */}
                    <div className="price-cell">
                      <span className="label">Price</span>
                      <span className="value">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>

                    {/* QUANTITY */}
                    <div className="qty-cell">
                      <div className="qty-control">
                        <button
                          onClick={() => handleDecrease(productId, item.size)}
                          className="qty-btn"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(productId, item.size)}
                          className="qty-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* TOTAL & DELETE */}
                    <div className="total-cell">
                      <div className="subtotal-group">
                        <span className="label">Subtotal</span>
                        <span className="value">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <button
                        className="delete-action"
                        onClick={() =>
                          handleRemoveFromCart(productId, item.size)
                        }
                      >
                        <div className="icon-wrapper">
                          <Trash2 size={18} strokeWidth={1.2} />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-actions">
              <div className="coupon-box">
                <input type="text" placeholder="Coupon Code" />
                <button>Apply</button>
              </div>
              <button className="clear-btn">Clear Cart</button>
            </div>
          </div>

          {/* SUMMARY SIDEBAR */}
          <aside className="cart-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Items</span> <span>{cartItems.length}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span> <span className="free">Free</span>
              </div>
              <div className="summary-line total">
                <span>Total</span> <span>₹{total.toLocaleString()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>

            <div className="trust-badges">
              <div className="badge">
                <Truck size={20} />{" "}
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders over ₹5,000</p>
                </div>
              </div>
              <div className="badge">
                <CreditCard size={20} />{" "}
                <div>
                  <h4>Flexible Payment</h4>
                  <p>Multiple secure options</p>
                </div>
              </div>
              <div className="badge">
                <Headphones size={20} />{" "}
                <div>
                  <h4>24x7 Support</h4>
                  <p>Expert style advice</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
