import React from "react";
import Header from "../pages/Home/header";
import Footer from "../pages/Home/footer";
import GetAllBook from "../pages/Home/getBookData";

const HomePage = () => {
  return (
    <>
      <div>
        <Header />
        <GetAllBook />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
