import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotes } from "./notes-thunk";

const initialState = {
  isLoading: false,
  notes: [],
};
export type NotesState = typeof initialState;

export const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setNotes(state, { payload }) {
      state.notes = [...state.notes, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<any>) => {
        state.notes = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;
