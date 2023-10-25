import { useState, useEffect } from "react";

const useProductHook = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    const data = fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data : ", data);
        setProductData(data);
        setLoading(false);

        return data;
      })
      .catch((err) => {
        return "Some error";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createPost = (formData) => {
    setLoading(true);
    console.log("The form data ", formData);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => console.log("Successfully created", data))
      .finally(() => setLoading(false));
  };

  return { productData, loading, setLoading, createPost };
};

export default useProductHook;
