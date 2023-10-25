import React from "react"
import Header from "./components/header";
import Footer from "./components/footer";


import GetAllBook from "./components/getBookData";
import AddBook from "./components/addBook";
import UpdateBook from "./components/updateBookData";
import DeleteBook from "./components/deleteBook";
import RegistrationForm from "./components/registrationFrom";
import DebounceDemo from "./components/debounceDemo";

const App = () => {
  console.log("Rendering from App.jsx File");
  
 
  return (
    <>
    <div>
     <Header/>
     {/* <DebounceDemo/> */}
     <GetAllBook/>
     <RegistrationForm/>
     {/*
     <AddBook/>
     <UpdateBook/>
     <DeleteBook/> */}
     <Footer/>
    </div>
    </>
  );
}

export default App;