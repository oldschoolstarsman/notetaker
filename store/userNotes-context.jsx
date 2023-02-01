import { createContext, useState } from "react";

export const NotesContext = createContext({
  notes: [],
  addNote: (note) => {},
  editNote: (note) => {},
  deleteNote: (note) => {},
});

function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((currentNotes) => [note, ...currentNotes]);
  }

  function deleteNote(note) {
    setNotes((currentNotes) =>
      currentNotes.filter((currentNote) => currentNote.id !== note.id)
    );
  }

  const value = { notes, addNote, deleteNote };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesContextProvider;
