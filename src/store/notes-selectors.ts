import { createSelector } from "@reduxjs/toolkit";
import { NoteDTO } from "../../types";
import { NotesState } from "./notes-reducer";

export const notesSelector = (state: NotesState) => state.notes;

export const favoritesNotesSelector = createSelector(notesSelector, (notes) =>
  notes.filter((note) => note.isFavorite)
);

export const searchQuerySelector = (state: NotesState) => state.searchQuery;

const queryMatch = (notes: NoteDTO[], searchQuery: NotesState["searchQuery"]) =>
  notes.filter((note) =>
    Object.values(note).some((v) => {
      if (v && typeof v === "string") {
        return v.toLowerCase().includes(searchQuery.toLowerCase());
      }
    })
  );

export const filteredNotes = createSelector(
  [notesSelector, searchQuerySelector],
  (notes, searchQuery) => queryMatch(notes, searchQuery)
);

export const filteredFavoriteNotes = createSelector(
  [favoritesNotesSelector, searchQuerySelector],
  (notes, searchQuery) => queryMatch(notes, searchQuery)
);
