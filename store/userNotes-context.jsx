import { createContext, useState, useEffect } from "react";
import { getNotes } from "../api/notesApi";

export const NotesContext = createContext({
  notes: [],
  addNote: (note) => {},
  editNote: (note) => {},
  deleteNote: (note) => {},
  isFetching: false,
  addToFavorite: (id) => {},
});

function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);

  useEffect(() => {
    setIsFetchingNotes(true);
    async function fetchNotes() {
      const data = await getNotes();
      setNotes(data);
      setIsFetchingNotes(false);
    }
    fetchNotes();
  }, []);

  function addNote(note) {
    setNotes((currentNotes) => [note, ...currentNotes]);
  }

  function editNote(note) {
    const newList = notes.map((item) => {
      if (item.id === note.id) {
        return note;
      } else {
        return item;
      }
    });
    setNotes(newList);
  }

  function deleteNote(id) {
    setNotes((currentNotes) =>
      currentNotes.filter((currentNote) => currentNote.id !== id)
    );
  }

  function addToFavorite(id) {
    const newList = notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isFavorite: true,
        };
      } else {
        return item;
      }
    });
    setNotes(newList);
  }

  const value = {
    notes,
    addNote,
    deleteNote,
    editNote,
    isFetching: isFetchingNotes,
    addToFavorite,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesContextProvider;
