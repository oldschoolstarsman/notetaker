import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNote, fetchNotes, removeNote, updateNote } from "./notes-thunks";

const initialState = {
  notes: [] as NoteDTO[],
  isFetching: false,
  isLoading: false,
  error: null,
};
export type NotesState = typeof initialState;

export const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isFetching = false;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes = [...state.notes, action.payload];
        state.isLoading = false;
      })
      .addCase(removeNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        removeNote.fulfilled,
        (state, action: PayloadAction<NoteDTO["id"]>) => {
          const newNotes = state.notes.filter(
            (note) => note.id !== action.payload
          );
          state.isLoading = false;
          state.notes = newNotes;
        }
      )
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        updateNote.fulfilled,
        (state, action: PayloadAction<NoteDTO>) => {
          state.isLoading = false;
          const newList = state.notes.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            } else {
              return item;
            }
          });
          state.notes = newList;
        }
      );
  },
});

export const {} = noteSlice.actions;
export default noteSlice.reducer;
