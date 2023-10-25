import React from "react";
import "./productComponent.style.scss";

const productComponent = ({ title, description, imageUrl, onAddToCart }) => {
  return (
    <>
      <div className="display-style">
      <div className="box-style">
        <center>
          <h1 className="title-style">{title}</h1>
          <p className="discription-style">{description}</p>
          <img className="image-style" src={imageUrl} alt="Loading Image" />
          <button className="cart-button-style" onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
              alert("Do you want to add this product to cart?");
            }}>Add to cart</button>
        </center>
      </div>
      </div>
    </>
  );
};

export default productComponent;
