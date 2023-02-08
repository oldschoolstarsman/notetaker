import { useContext, useRef } from "react";
import { HStack, VStack, Text } from "@react-native-material/core";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { GlobalStyles, Routes } from "../../constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { NotesContext } from "../../store/userNotes-context";
import { useNavigation } from "@react-navigation/native";
import { deleteNote as removeNote, updateNote } from "../../api/notesApi";

function NoteActionsSheet(props: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { deleteNote, addToFavorite } = useContext(NotesContext);
  const item = props.payload?.item;
  const navigation = useNavigation();

  function closeDrawer() {
    SheetManager.hide(props.sheetId);
  }

  function handleDeleteNote() {
    deleteNote(item.id);
    removeNote(item.id);
    closeDrawer();
  }

  function handleToggleFavorite() {
    updateNote({ ...item, isFavorite: !item.favorite });
    addToFavorite(item.id);
    closeDrawer();
  }

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={props.sheetId}
      containerStyle={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <HStack
        style={{
          height: 85,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <VStack center>
          <Icon
            onPress={handleDeleteNote}
            color={GlobalStyles.colors.red}
            size={28}
            name="delete-outline"
          />
          <Text variant="caption">Delete</Text>
        </VStack>
        <VStack center>
          <Icon
            onPress={handleToggleFavorite}
            color={GlobalStyles.colors.accent}
            size={28}
            name="star-outline"
          />
          <Text variant="caption">Favourite</Text>
        </VStack>
        <VStack center>
          <Icon
            onPress={() => {
              navigation.navigate(Routes.NoteEditor, item);
              closeDrawer();
            }}
            color={GlobalStyles.colors.black}
            size={28}
            name="pencil-outline"
          />
          <Text variant="caption">Edit</Text>
        </VStack>
      </HStack>
    </ActionSheet>
  );
}

export default NoteActionsSheet;