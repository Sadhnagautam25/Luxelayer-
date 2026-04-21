import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCart from "../Hooks/useCart";
import "../styles/CartPage.scss";
import { Trash2, Minus, Plus } from "lucide-react";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const {
    handleGetCart,
    handleIncrease,
    handleDecrease,
    handleRemoveFromCart,
  } = useCart();

  const { cartItems = [] } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetCart();
  }, []);

  // 🔥 TOTAL PRICE
  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // 🔥 SEARCH FILTER
  const filteredCartItems = cartItems?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {/* Navbar search connect */}
      <Navbar onSearch={setSearchTerm} />

      <div className="cart-page">
        <div className="cart-container">
          {/* LEFT SIDE */}
          <div className="cart-items">
            <h2>Your Cart</h2>

            {filteredCartItems.length === 0 ? (
              <p className="empty">No items found</p>
            ) : (
              filteredCartItems.map((item) => {
                const productId =
                  typeof item.product === "object"
                    ? item.product._id
                    : item.product;

                return (
                  <div className="cart-item" key={item._id}>
                    <div className="item-img">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="size">Size: {item.size}</p>
                      <p className="price">₹{item.price}</p>

                      <div className="quantity-box">
                        <button
                          onClick={() => handleDecrease(productId, item.size)}
                        >
                          <Minus size={16} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => handleIncrease(productId, item.size)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveFromCart(productId, item.size)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
