import { useEffect, useState } from "react";
import api from "../api";

export const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  // need this array(setOriginalBooks) to manipulate with data
  // no need to touch original array, we can manipulate with this one
  const [originalBooks, setOriginalBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [movieTitles, setMovieTitles] = useState([]);
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/books/");
        setBooks(response.data);
        setOriginalBooks(response.data);
        const allAuthors = response.data.map((item) => item.author);
        setAuthors(allAuthors);

        const allMovieTitle = response.data.map((item) => item.title);
        setMovieTitles(allMovieTitle);
      } catch (error) {
        console.error("Something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const testFunc = async () => {
    try {
      const response = await api.get("/api/notes/");
      if(response) {
        console.log("Here is notes response", response)
      }
    } catch (error) {
      console.log(error)      
    }
  }

  const filterByAuthorNameOrMovieTitle = async (type, author, movieTitle) => {
    setLoading(true);
    const queryParam =
      type === "author"
        ? `author=${encodeURIComponent(author)}`
        : `title=${encodeURIComponent(movieTitle)}`;

    try {
      const response = await api.get(`/api/books/?${queryParam}`);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();

    if (!term) {
      setBooks(originalBooks);
      return;
    }

    const filtered = originalBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(term) ||
        b.description.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term)
    );
    console.log(filtered);

    setBooks(filtered);
  };

  const onDeleteBook = async (id) => {
    try {
      const response = await api.delete(`/api/books/${id}/`);
      console.log("Book deleted:", response);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  const handleSort = async () => {
    const nextOrder = sort === "asc" ? "desc" : "asc";
    setSort(nextOrder);

    const orderingParam =
      nextOrder === "asc" ? "published_date" : "-published_date";

    try {
      const response = await api.get(`/api/books/?ordering=${orderingParam}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const resetFilters = async () => {
    try {
      const response = await api.get("/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching all books:", error);
    }
  };

  return {
    books,
    onDeleteBook,
    authors,
    movieTitles,
    filterByAuthorNameOrMovieTitle,
    handleSearch,
    handleSort,
    sort,
    resetFilters,
    loading
  };
};
