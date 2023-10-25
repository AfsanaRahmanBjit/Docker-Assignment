import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const DebounceDemo = () => {
  const [productId, setProductId] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [productData, setProductData] = useState({});

  const callProductApi = () => {
    axiosInstance
      .get(`/books/all?search=${searchText}`)
      .then((resp) => resp.data)
      .then((data) => {
        console.log("Data : ", data);
        setProductData(data);

        return data;
      })
      .catch((err) => {
        setErrorMsg("Some error occured");
        return "Some error";
      })
      .finally(() => {});
  };

  useEffect(() => {
    console.log("Product ID: ", productId);

    const timeOutFunc = setTimeout(() => {
      callProductApi();
    }, 3000);

    return () => clearTimeout(timeOutFunc);
  }, [productId]);

  return (
    <div>
      <h1>MODULE: Debounce demo</h1>
      <input
        placeholder="Enter ID"
        onChange={(e) => setProductId(e.target.value)}
      />

      <h4>Fetched Data by ID: </h4>
      <div>
        <h5>Title: {productData?.title}</h5>
        <p>Description: {productData?.body}</p>
        {errorMsg && <h4>Error: {errorMsg}</h4>}
      </div>
    </div>
  );
};

export default DebounceDemo;