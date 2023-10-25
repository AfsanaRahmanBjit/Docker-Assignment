import React, { useEffect, useState } from "react";
import useProductHook from "../../hooks/useProductHook";

const FetchDemo = () => {
  const { productData, loading } = useProductHook();

  return (
    <div>
      <h1>FetchDemo</h1>
      <h3>Products list: </h3>
      {loading === true && <h1>Loading...</h1>}
      {productData.map((product) => {
        return (
          <div key={product.id}>
            <h5>Title: {product.title}</h5>
            <p>Description: {product.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FetchDemo;
