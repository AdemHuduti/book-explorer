import { useState } from "react";
import { useFetchBooks } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import FilterSelect from "../FilterSelect";
import BookCard from "./BookCard";

const BookList = () => {
  const {
    books,
    onDeleteBook,
    authors,
    filterByAuthorNameOrMovieTitle,
    handleSearch,
    movieTitles,
    sort,
    handleSort,
    resetFilters,
    loading,
  } = useFetchBooks();
  const navigate = useNavigate();

  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

  const editBook = (id) => {
    navigate(`/edit/${id}`);
  };

  const viewBookDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSelectChange = (value, type) => {
    if (type === "author") {
      setSelectedAuthor(value);
      filterByAuthorNameOrMovieTitle("author", value);
    } else if (type === "movie") {
      setSelectedMovieTitle(value);
      filterByAuthorNameOrMovieTitle("movie", null, value);
    }
  };

  const onHandleResetFilters = () => {
    resetFilters();
    setSelectedAuthor("");
    setSelectedMovieTitle("");
  };

  return (
    <div className="container">
      <div className="filters">
        <h2>Filters</h2>

        <div className="filters-wrapper">
          <FilterSelect
            label="Choose author:"
            name="authors"
            id="authors"
            value={selectedAuthor}
            options={authors}
            onChange={(value) => handleSelectChange(value, "author")}
          />

          <FilterSelect
            label="Choose movie:"
            name="movies"
            id="movies"
            value={selectedMovieTitle}
            options={movieTitles}
            onChange={(value) => handleSelectChange(value, "movie")}
          />

          <div>
            <button onClick={() => handleSort(sort ? "asc" : "desc")}>
              Sort by Date:{sort === "asc" ? "⬆️ Ascending" : "⬇️ Descending"}
            </button>
          </div>
        </div>

        <div>
          <div>
            <h2>Search</h2>
            <input
              type="text"
              placeholder="Search by title, description or author"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        {(selectedAuthor || selectedMovieTitle) && (
          <button
            onClick={() => onHandleResetFilters()}
            style={{
              cursor: "pointer",
              background: "#2ecc71",
              color: "#FFF",
              marginTop: 20,
              width: "100%",
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books">
          <BookCard
            books={books}
            onDeleteBook={onDeleteBook}
            editBook={editBook}
            viewBookDetails={viewBookDetails}
          />
        </div>
      )}
    </div>
  );
};

export default BookList;
