import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  notes: [{ new: 1 }],
};
export type NotesState = typeof initialState;

export const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setNotes(state: NotesState, action: PayloadAction<any>) {
      console.log(state, action);
    },
  },
});

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;
