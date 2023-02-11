enum Routes {
  NotesList = "NoteList",
  NoteEditor = "NoteEditor",
}

const GlobalStyles = {
  colors: {
    white: "#fff",
    lightGrey: "#f6f6f6",
    red: "#ae2012",
    black: "#000",
    accent: "#257e81",
  },
};

const ColorPickerColors = [
  "#4a4e4d",
  "#0e9aa7",
  "#fe8a71",
  "#f6cd61",
  GlobalStyles.colors.lightGrey,
];

export { Routes, GlobalStyles, ColorPickerColors };
