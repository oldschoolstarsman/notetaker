type Note = {
  title: string;
  note: string;
};

type NoteDTO = Note & { id: string; isFavorite: boolean };

type ColoredNote = NoteDTO & { color?: string };
