import { useState } from "react";
import { searchProductsApi } from "../services/search.api.service";

const useSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const data = await searchProductsApi(value);

      setSearchResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    keyword,
    setKeyword,
    searchResults,
    loading,
    handleSearch,
  };
};

export default useSearch;
