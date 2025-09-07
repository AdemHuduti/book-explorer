function BookCard({ books, onDeleteBook, editBook, viewBookDetails }) {
  return (
    <>
      {books.map((book) => (
        <div key={book.id} className="book-details">
          <div>
            <h2>{book.title}</h2>
            <p>
              {book?.description?.length > 50
                ? `${book.description.slice(0, 50)}...`
                : book.description}
            </p>
          </div>

          <div>
            <small>By: {book.author}</small>
            <div>
              <small
                style={{
                  color: "#F2E9E1 ",
                  background: "#1F3756",
                  padding: 2,
                  borderRadius: "5px",
                  marginTop: " 5px",
                }}
              >
                {book.notes_count} notes
              </small>
            </div>
          </div>

          <div className="options">
            <button className="edit" onClick={() => editBook(book.id)}>
              Edit
            </button>
            <button
              className="details"
              onClick={() => viewBookDetails(book.id)}
            >
              Details
            </button>
            <button className="delete" onClick={() => onDeleteBook(book.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default BookCard;
