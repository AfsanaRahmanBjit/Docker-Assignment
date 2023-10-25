// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import "./getBookData.style.scss";

// const GetAllBook = () => {
//   const [books, setBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   let timeoutId;

//   const fetchBookData = (query) => {
//     let url = "/books/all";

//     if (query) {
//       url += `?search=${query}`;
//     }

//     axiosInstance
//       .get(url)
//       .then((response) => {
//         const data = response.data.data.Result;
//         console.log(data);
//         setBooks(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

 

//   useEffect(() => {
//     console.log("Search Query: ", searchQuery);
//     clearTimeout(timeoutId);

//     timeoutId = setTimeout(() => {
//       fetchBookData(searchQuery);
//     }, 500);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [searchQuery]);

//   return (
//     <div>
//       <div className="body-style">
//         <input
//           className="search-bar"
//           type="text"
//           placeholder="Search books"
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             handleSearch();
//           }}
//         />
//       </div>
//       {books.length > 0 && (
//         <ul className="book-container">
//           {books.map((book) => (
//             <li key={book._id} className="book-list">
//               <div className="book-style">
//                 <img
//                   src="src/images/book.jpg"
//                   alt="Book Cover"
//                   className="book-image"
//                 />
//                 <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
//                 {book.author},<strong>Publisher:</strong> {book.publisher},{" "}
//                 <strong>Price:</strong> {book.price}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default GetAllBook;


import React from "react";
import useGetAllBookHook from "../../hooks/useGetAllBookHook";
import "./getBookData.style.scss";

const GetAllBook = () => {
  const { books, searchQuery, handleSearch } = useGetAllBookHook();

  return (
    <div>
      <div className="body-style">
        <input
          className="search-bar"
          type="text"
          placeholder="Search books"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {books.length > 0 && (
        <ul className="book-container">
          {books.map((book) => (
            <li key={book._id} className="book-list">
              <div className="book-style">
                <img
                  src="src/images/book.jpg"
                  alt="Book Cover"
                  className="book-image"
                />
                <strong>Title:</strong> {book.title}, <strong>Author:</strong>{" "}
                {book.author},<strong>Publisher:</strong> {book.publisher},{" "}
                <strong>Price:</strong> {book.price}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllBook;

