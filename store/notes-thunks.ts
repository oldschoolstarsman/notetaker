import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotes,
  deleteNote,
  storeNote,
  updateNote as editNote,
} from "../api/notesApi";
import { Note, NoteDTO } from "../types";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", () =>
  getNotes()
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (note: Note) => {
    const id = await storeNote(note);
    const data = { id, ...note };
    return data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  (note: NoteDTO) => editNote(note)
);

export const removeNote = createAsyncThunk(
  "notes/removeNote",
  (id: NoteDTO["id"]) => deleteNote(id)
);
