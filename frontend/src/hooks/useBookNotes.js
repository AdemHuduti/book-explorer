import { useState, useEffect } from "react";
import api from "../api";

const useBookNotes = (bookId) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteValue, setEditNoteValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/notes/");
        const userNotes = res.data.filter((n) => n.book === parseInt(bookId));
        setNotes(userNotes);
        setLoading(false);
      } catch (err) {
        setError("Error fetching notes");
        setLoading(false);
      }
    };

    if (bookId) fetchNotes();
  }, [bookId]);

  const saveNote = async (newNote) => {
    try {
      if (editNoteId) {
        // Edit existing note
        await api.patch(`/api/notes/${editNoteId}/`, { note: newNote });
        setNotes(
          notes.map((n) => (n.id === editNoteId ? { ...n, note: newNote } : n))
        );
        setEditNoteId(null);
        setEditNoteValue("");
      } else {
        // Create new note
        const res = await api.post("/api/notes/", {
          note: newNote,
          book: bookId,
        });
        setNotes([...notes, res.data]);
      }
      setNote("");
      setError("");
    } catch (err) {
      setError("Error saving note");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.delete(`/api/notes/${noteId}/`);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError("Error deleting note");
    }
  };

  const startEditing = (noteId, existingNote) => {
    setEditNoteId(noteId);
    // Pre-fill the textarea with the note content
    setNote(existingNote);
    setEditNoteValue(existingNote);
  };

  const cancelEditing = () => {
    setEditNoteId(null);
    setNote("");
    setEditNoteValue();
  };

  return {
    notes,
    note,
    editNoteId,
    loading,
    error,
    saveNote,
    deleteNote,
    setNote,
    startEditing,
    cancelEditing,
    editNoteValue,
    setEditNoteValue,
  };
};

export default useBookNotes;
