import { useState, useEffect } from "react";

export function useGetBookDataHook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/books/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.data.Result);
        setBooks(data.data.Result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  return { books, loading, error };
}
