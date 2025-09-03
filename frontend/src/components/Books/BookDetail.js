import { useParams } from "react-router-dom";
import { useFetchBooksById } from "../../hooks/useFetchBookById";
import { useEffect, useState } from "react";
import api from "../../api";

function BookDetail() {
  const { id } = useParams();
  const { book } = useFetchBooksById(id);

  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [author, setBookAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");

  useEffect(() => {
    if (book && book.title) {
      setBookTitle(book.title);
      setBookDescription(book.description);
      setBookAuthor(book.author);
      setPublishDate(book.published_date);
    }
  }, [book]);

  if (!book || !book.title) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="book-details-info">
        <h1>Book detail: {bookTitle}</h1>
        <i>{bookDescription}</i>
        <p>Published: {publishDate}</p>
        <p>Author: <b>{author}</b></p>
      </div>
    </div>
  );
}

export default BookDetail;
