import { useState } from "react";
import api from "../../api";
import ProtectedRoute from "../ProtectedRoutes";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorError, setAuthorError] = useState([]);
  const [titleError, setTitleError] = useState([]);
  const [dateError, setDateError] = useState([]);
  const [date, setNewDate] = useState("");

  const navigate = useNavigate();

  const onBookSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      description,
      published_date: date,
    };

    try {
      const response = await api.post("/api/books/", newBook);
      if (response) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      console.log("Error", error);
      setAuthorError(error.response?.data?.author);
      setTitleError(error.response?.data?.title);
      setDateError(error.response?.data?.published_date);
    }
  };

  return (
    <div>
      <ProtectedRoute to="/login">
        <form onSubmit={(e) => onBookSubmit(e)} className="form">
          <h1>Add book</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Title </label>
            <input
              placeholder="Book title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <small style={{ color: "red" }}>{titleError} </small>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Author</label>
            <input
              placeholder="Book author"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <small style={{ color: "red" }}>{authorError} </small>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Description</label>
            <input
              placeholder="Book description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Published date</label>
            <input
              placeholder="Published date"
              type="date"
              onChange={(e) => setNewDate(e.target.value)}
            />

            <small style={{ color: "red", width: '300px' }}>{dateError} </small>
          </div>

          <button type="submit">Submit new book</button>
        </form>
      </ProtectedRoute>
    </div>
  );
}

export default AddBook;
