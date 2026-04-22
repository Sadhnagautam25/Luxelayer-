import React, { useEffect, useState } from "react";
import { searchProductsApi } from "../services/search.api.service";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import useProduct from "../Hooks/useProduct";
import "../styles/ShopPage.scss";
import { useNavigate } from "react-router-dom";
import LoadingLoader from "../components/LoadingLoder";
import Footer from "../components/Footer";

const ShopPage = () => {
  const { handleCategoryProduct } = useProduct();
  const navigate = useNavigate();

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { categoryProducts, selectedCategory, loading, error } = useSelector(
    (state) => state.product,
  );

  const categories = [
    { label: "Women", value: "women" },
    { label: "Men", value: "men" },
    { label: "Kids", value: "kids" },
    { label: "Home & Beauty", value: "home_beauty" },
  ];

  // default products
  useEffect(() => {
    handleCategoryProduct("women");
  }, []);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setIsSearching(false);
      setSearchedProducts([]);
      return;
    }

    setIsSearching(true);

    try {
      const data = await searchProductsApi(value);
      setSearchedProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      {/* Category Navbar */}
      <div className="shop-category-bar">
        {categories.map((item) => (
          <button
            key={item.value}
            onClick={() => handleCategoryProduct(item.value)}
            className={selectedCategory === item.value ? "active-category" : ""}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="shop-products">
        {loading && <LoadingLoader />}

        {error && <p>{error}</p>}

        {!loading &&
          (isSearching ? searchedProducts : categoryProducts)?.map(
            (product) => (
              <div
                key={product._id}
                className="shop-product-card"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="image-container">
                  <img src={product.images?.[0]} alt={product.name} />
                </div>

                <p className="category-tag">{product.category}</p>

                <h3>{product.name}</h3>

                <p className="price">
                  {product.currency} {product.price}
                </p>
              </div>
            ),
          )}

        {!loading &&
          (isSearching ? searchedProducts : categoryProducts)?.length === 0 && (
            <p>No Products Found</p>
          )}
      </div>

      <Footer />
    </>
  );
};

export default ShopPage;
