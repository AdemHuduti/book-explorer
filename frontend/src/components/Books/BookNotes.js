function BookNotes({
  notes,
  note,
  editNoteValue,
  editNoteId,
  saveNote,
  deleteNote,
  setNote,
  startEditing,
  cancelEditing,
  setEditNoteValue,
}) {
  return (
    <>
      {/* className of books and book-details - already contains grid and align elements nicely */}
      <div className="books">
        {notes.length === 0 && <p>No notes yet.</p>}
        {notes.map((noteItem) => (
          <div
            key={noteItem.id}
            style={{ marginBottom: "15px" }}
            className="book-details"
          >
            {noteItem.id === editNoteId ? (
              <div>
                <textarea
                  rows="5"
                  cols="50"
                  value={editNoteValue}
                  onChange={(e) => setEditNoteValue(e.target.value)}
                />
                <div className="notes-options">
                  <button
                    onClick={() => saveNote(editNoteValue)}
                    className="update-save-note"
                  >
                    Update note
                  </button>
                  <button onClick={cancelEditing} className="delete-note">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="notes-options">
                <div>
                  <i>{noteItem.note}</i>
                </div>
                <button
                  className="update-save-note"
                  onClick={() => {
                    startEditing(noteItem.id, noteItem.note);
                    setNote("");
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(noteItem.id)}
                  className="delete-note"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />
      <h3>Add a New Note:</h3>
      <div className="notes-options">
        <textarea
          rows="5"
          cols="50"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your personal note here..."
        />
        <br />
        <button onClick={() => saveNote(note)} className="update-save-note">
          Save Note
        </button>
      </div>
    </>
  );
}

export default BookNotes;
