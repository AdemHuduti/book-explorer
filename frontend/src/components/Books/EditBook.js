import { useNavigate, useParams } from "react-router-dom";
import { useFetchBooksById } from "../../hooks/useFetchBookById";
import { useEffect, useState } from "react";
import api from "../../api";

function EditBook() {
  const { id } = useParams();
  const { book } = useFetchBooksById(id);
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newYear, setNewYear] = useState("");
  const [successEdit, setSuccessEdit] = useState("");

  useEffect(() => {
    if (book && book.title) {
      setNewTitle(book.title);
      setNewDescription(book.description);
      setNewYear(book.published_date);
    }
  }, [book]);

  const onEditBook = async (e) => {
    e.preventDefault();

    const data = {
      title: newTitle,
      author: book.author,
      description: newDescription,
      published_date: newYear
    };

    try {
      const response = await api.put(`/api/books/${id}/`, data);
      if (response.data) {
        setSuccessEdit("Book updated!");
      }
    } catch (err) {
      console.error("Failed to update book:", err);
      setSuccessEdit("");
    }
  };

  if (!book || !book.title) return <p>Loading...</p>;

  return (
    <form className="form" onSubmit={onEditBook}>
      <h1>Edit book: {book.title}</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Title </label>
        <input
          placeholder="Enter new title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Title </label>
        <input
          placeholder="Update year"
          type="text"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <label>Description </label>
        <textarea
          style={{
            height: "100px",
          }}
          placeholder="Enter new description"
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      {successEdit && <p>{successEdit}</p>}
      <div>
        <button type="submit">Edit</button>
        <button type="button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </form>
  );
}

export default EditBook;
