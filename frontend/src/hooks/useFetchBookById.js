import { useEffect, useState } from "react";
import api from "../api";

export const useFetchBooksById = (id) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async (id) => {
      try {
        const response = await api.get(`/api/books/${id}/`);
        setBook(response.data);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };

    getBook(id);
  }, []);

  return { book };
};
