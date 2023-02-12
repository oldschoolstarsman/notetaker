export type Note = {
  title: string;
  note: string;
};

export type NoteDTO = Note & {
  id: string;
  isFavorite: boolean;
  color?: string;
};

export type RootStackParamList = {
  NotesList: undefined;
  NoteEditor: Note | NoteDTO;
};
