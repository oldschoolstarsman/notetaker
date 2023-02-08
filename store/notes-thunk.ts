import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNotes } from "../api/notesApi";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await getNotes();
  return response;
});
