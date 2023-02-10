import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { NotesState } from "./notes-reducer";

export const notesSelector = (state: NotesState) => state.notes;

export const favoritesNotesSelector = createSelector(notesSelector, (notes) =>
  notes.filter((note) => note.isFavorite)
);

export const searchQuerySelector = (state: NotesState) =>
  state.searchQuery.toLowerCase().trim();

const includesString = (
  notes: NoteDTO[],
  searchQuery: RootState["searchQuery"]
) =>
  notes.filter((note) =>
    !!searchQuery
      ? note.title.includes(searchQuery) || note.note.includes(searchQuery)
      : notes
  );

export const filteredNotes = createSelector(
  [notesSelector, searchQuerySelector],
  (notes, searchQuery) => includesString(notes, searchQuery)
);

export const filteredFavoriteNotes = createSelector(
  [favoritesNotesSelector, searchQuerySelector],
  (notes, searchQuery) => includesString(notes, searchQuery)
);
