import React, { useState } from "react";
import useProductHook from "../hooks/useProductHook";

const PostDemo = () => {
  const { createPost } = useProductHook();

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const data = {
      title: productTitle,
      description: productDescription,
    };

    createPost(data);

    console.log(
      "The title ",
      productTitle,
      " & description ",
      productDescription
    );

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: productTitle,
        body: productDescription,
      }),
    });
  };

  return (
    <div>
      <h1>Post Data</h1>
      <p>Enter title</p>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          label="title"
          placeholder="input title"
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <p>Enter Description</p>
        <input
          type="text"
          label="description"
          placeholder="input description"
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PostDemo;
