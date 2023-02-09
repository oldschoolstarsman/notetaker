type Note = {
  title: string;
  note: string;
  isFavorite: boolean;
};

type NoteDTO = Note & { id: string };
