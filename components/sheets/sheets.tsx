import { registerSheet } from "react-native-actions-sheet";
import NoteActionsSheet from "./NoteActionsSheet";
import ConfirmSheet from "./ConfirmSheet";
registerSheet("note-actions-sheet", NoteActionsSheet);
registerSheet("confirm-sheet", ConfirmSheet);

export {};
