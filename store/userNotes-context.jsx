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

  const value = { notes, addNote, deleteNote, editNote };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesContextProvider;
