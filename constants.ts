enum Routes {
  NotesList = "NoteList",
  NoteEditor = "NoteEditor",
}

const GlobalStyles = {
  colors: {
    white: "rgba(255, 255, 255, 1)",
    lightGrey: "rgba(246, 246, 246, 1)",
    darkKey: "rgba(185, 183, 183, 1)",
    green: "rgb(43, 54, 15)",
    lightGreen: "rgb(236, 253, 236)",
    red: "#ae2012",
    black: "rgba(0, 0, 0, 1)",
    accent: "rgba(37, 126, 129, 1)",
    lightPurple: "rgb(243, 238, 253)",
    yellow: "rgb(251, 243, 152)",
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
