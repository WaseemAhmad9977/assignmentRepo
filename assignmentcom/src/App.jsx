import React, { useState } from "react";
import EcommerceApp from "./components/EcommerceApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDiscription from "./components/ProductDiscription";
import Context from "./Context";

const App = () => {
  const [productDetails,setProductDetails] = useState({})
  return (
    <Context.Provider value={{productDetails,setProductDetails}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EcommerceApp />} />
          <Route path="/products/:slug" element={<ProductDiscription />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
