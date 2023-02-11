type Note = {
  title: string;
  note: string;
};

type NoteDTO = Note & { id: string; isFavorite: boolean; color?: string };
