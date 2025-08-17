import React, { useState, useContext } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import Context from "../Context";
import { useNavigate } from "react-router-dom";

import ProductSkeleton from "./ProductSkeleton";

const EcommerceUI = () => {
  const navigate = useNavigate();
  const { setProductDetails } = useContext(Context);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("Default");

  const {
    data: products,
    isLoading,
    error,
  } = useSWR("/products", fetcher);

 if (isLoading) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
      <p className="text-gray-600 mb-6">Discover our amazing collection of products</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, item) => (
          <ProductSkeleton key={item} />
        ))}
      </div>
    </div>
  );

}
  if (error) return <div>Failed to load products.</div>;

  let filteredProducts =
    selectedCategory === "All Categories"
      ? products
      : products.filter(
          (item) => item.category === selectedCategory.toLowerCase()
        );

  if (sortOption === "Price: Low → High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High → Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const openProduct = (item) => {
    setProductDetails(item);
    navigate(`/products/${item.title.split(" ").join("-").toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600 mb-6">
          Discover our amazing collection of products
        </p>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <div className="relative">
              <select
                className="appearance-none border rounded px-4 py-2 pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                {uniqueCategories.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort:</label>
            <div className="relative">
              <select
                className="appearance-none border rounded px-4 py-2 pr-8"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option>Default</option>
                <option>Price: Low → High</option>
                <option>Price: High → Low</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="ml-auto text-sm text-gray-600">
            {filteredProducts.length} products found
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer group"
              onClick={() => openProduct(item)}
            >
              <div className="aspect-square p-4 bg-gray-50 rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize mb-2">
                  {item.category}
                </span>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ${item.price}
                  </span>
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {item.rating.rate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceUI;
