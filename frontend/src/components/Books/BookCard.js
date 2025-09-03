function BookCard({ books, onDeleteBook, editBook, viewBookDetails }) {
  return (
    <>
      {books.map((book) => (
        <div key={book.id} className="book-details">
          <h2>{book.title}</h2>
          <p>
            {book?.description?.length > 50
              ? `${book.description.slice(0, 50)}...`
              : book.description}
          </p>
          <small>By: {book.author}</small>
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
