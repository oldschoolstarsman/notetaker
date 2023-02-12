enum Routes {
  NotesList = "NoteList",
  NoteEditor = "NoteEditor",
}

const GlobalStyles = {
  colors: {
    white: "rgba(255, 255, 255, 1)",
    lightGrey: "rgba(246, 246, 246, 1)",
    darkKey: "rgba(185, 183, 183, 1)",
    orange: "rgb(254, 214, 154, 1)",
    lightGreen: "rgb(236, 253, 236)",
    black: "rgba(0, 0, 0, 1)",
    accent: "rgba(37, 126, 129, 1)",
    lightPurple: "rgb(243, 238, 253)",
    yellow: "rgb(251, 243, 152)",
    lighterDark: "rgb(33, 33, 33)",
  },
};

const ColorPickerColors = [
  "#4a4e4d",
  "#0e9aa7",
  "#fe8a71",
  GlobalStyles.colors.lightPurple,
  GlobalStyles.colors.lightGreen,
  GlobalStyles.colors.yellow,
  GlobalStyles.colors.orange,
  // GlobalStyles.colors.lightGrey,
];

export { Routes, GlobalStyles, ColorPickerColors };
