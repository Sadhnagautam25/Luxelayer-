import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Product.scss";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p._id} className="product-card">
          {/* Image */}
          <div className="image-box">
            <img src={p.images?.[0]} alt={p.name} />

            <div className="overlay">
              <button onClick={() => navigate(`/product/${p._id}`)}>
                View Details
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="info">
            <span className="cat">{p.category}</span>

            <h4>{p.name}</h4>

            <p className="price">
              {p.currency} {p.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
