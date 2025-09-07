import { useParams } from "react-router-dom";
import useBookNotes from "../../hooks/useBookNotes";
import { useFetchBooksById } from "../../hooks/useFetchBookById";
import BookNotes from "./BookNotes";

const BookDetail = () => {
  const { id } = useParams(); // book ID from URL
  const { book } = useFetchBooksById(id);
  const {
    notes,
    note,
    editNoteValue,
    loading,
    error,
    editNoteId,
    saveNote,
    deleteNote,
    setNote,
    startEditing,
    cancelEditing,
    setEditNoteValue,
  } = useBookNotes(id);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <div className="book-details-info">
        {book && (
          <>
            <h2>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>{book.description}</p>
            <p>
              <strong>Published:</strong> {book.published_date}
            </p>

            <hr />
            <h3>Your Notes:</h3>
            <BookNotes
              notes={notes}
              note={note}
              editNoteValue={editNoteValue}
              editNoteId={editNoteId}
              saveNote={saveNote}
              deleteNote={deleteNote}
              setNote={setNote}
              startEditing={startEditing}
              cancelEditing={cancelEditing}
              setEditNoteValue={setEditNoteValue}
            />
          </>
        )}
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      </div>
    </div>
  );
};

export default BookDetail;
