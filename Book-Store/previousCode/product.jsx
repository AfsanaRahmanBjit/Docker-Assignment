import ProductComponent from "./productComponent.jsx";
import Cart from "./cart.jsx"; 
import "./product.style.scss";

import React from "react";
import { useState } from "react";

function Product() {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCartItems);
  };
  const Data = [
    {
      id: 1,
      title: "Title 1",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 2,
      title: "Title 2",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 3,
      title: "Title 3",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 4,
      title: "Title 4",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 5,
      title: "Title 5",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 6,
      title: "Title 6",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 7,
      title: "Title 7",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 8,
      title: "Title 8",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 9,
      title: "Title 9",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 10,
      title: "Title 10",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 11,
      title: "Title 11",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 12,
      title: "Title 12",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 13,
      title: "Title 13",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 14,
      title: "Title 14",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 15,
      title: "Title 15",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 16,
      title: "Title 16",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 17,
      title: "Title 17",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 18,
      title: "Title 18",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 19,
      title: "Title 19",
      description: "description",
      imageUrl: "src/images/book.jpg"
    },
    {
      id: 20,
      title: "Title 20",
      description: "description",
      imageUrl: "src/images/book.jpg"
    }
  ];
  
  return (
    <>
      <h1 className="heading-style">All the available Books</h1>
      <div className="display-style">
      <Cart cartItems={cartItems}  onRemoveFromCart={removeFromCart}/>
      </div>
      <div className="display-style">
        {Data.length > 0 &&
          Data.map((product, i) => {
            return (
                <ProductComponent
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  onAddToCart={() => addToCart(product)}
                />
              
            );
          })}
      </div>
    </>
  );
}

export default Product;
