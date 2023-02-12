import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, NoteDTO } from "../../types";
import { createNote, fetchNotes, removeNote, updateNote } from "./notes-thunks";

const initialState = {
  notes: [] as NoteDTO[] | Note[],
  isFetching: false,
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedNote: null,
};
export type NotesState = typeof initialState;

export const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectItem: (state, action: PayloadAction<string>) => {
      state.selectedNote = action.payload;
    },
  },
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
          const newList = state.notes.map((note: NoteDTO) => {
            if (note.id === action.payload.id) {
              return action.payload;
            } else {
              return note;
            }
          });
          state.notes = newList;
        }
      );
  },
});

export const { setSearchQuery, setSelectItem } = noteSlice.actions;
export default noteSlice.reducer;
