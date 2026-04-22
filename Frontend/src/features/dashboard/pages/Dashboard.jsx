import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.scss";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import useProduct from "../Hooks/useProduct";
import { searchProductsApi } from "../services/search.api.service";
import Footer from "../components/Footer";

const LuxeLayerHome = () => {
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();

  const productSectionRef = useRef(null);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = useSelector((state) => state.product.products || []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        await handleGetAllProducts();
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      const data = await searchProductsApi(value);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterSearch = () => {
    productSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
   <>
    <div className="luxelayer-container">
      {/* Navbar */}
      <Navbar onSearch={handleSearch} onEnterSearch={handleEnterSearch} />

      {/* Hero */}
      <header className="hero">
        <div className="hero-content">
          <p className="caps">Seasonal Boutique</p>

          <h2>The Winter Edit</h2>

          <button className="cta-btn" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </div>
      </header>

      {/* Products */}
      <main className="main-content" ref={productSectionRef}>
        <div className="section-title">
          <h3>Curated Picks</h3>
          <p>Hand-selected luxury pieces for your wardrobe.</p>
        </div>

        {(filteredProducts.length ? filteredProducts : products).length > 0 ? (
          <ProductCard
            products={filteredProducts.length ? filteredProducts : products}
          />
        ) : (
          <div className="no-products">
            <h3>No Products Available</h3>
            <p>Please check again later.</p>
          </div>
        )}
      </main>
    </div>
    <Footer/>
   </>
  );
};

export default LuxeLayerHome;
