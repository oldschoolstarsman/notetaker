import { useRef } from "react";
import { HStack } from "@react-native-material/core";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { GlobalStyles, Routes } from "../../constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { createNote, removeNote, updateNote } from "../../store/notes-thunks";
import { useAppDispatch, useAppSelector } from "../../store";
import { View, StyleSheet } from "react-native";
import ColorPicker from "../ColorPicker";
import RNBounceable from "@freakycoder/react-native-bounceable";
import FadeElement from "../FadeComponent";
import { getSelectedNote } from "../../store/notes-selectors";

function NoteActionsSheet(props: SheetProps<{ updateNote: () => void }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const selectedNote = useAppSelector(getSelectedNote);

  function closeDrawer() {
    SheetManager.hide(props.sheetId);
  }

  async function handleConfirm() {
    closeDrawer();
    const canDelete = await SheetManager.show("confirm-sheet", {
      payload: {
        message: `Sure you want to delete this note?`,
      },
    });
    if (canDelete) {
      handleDeleteNote();
    }
  }

  function handleDeleteNote() {
    dispatch(removeNote(selectedNote.id));
    closeDrawer();
  }

  function handleToggleFavorite() {
    dispatch(
      updateNote({ ...selectedNote, isFavorite: !selectedNote.isFavorite })
    );
  }

  function handleDuplicate() {
    const copy = { ...selectedNote };
    delete copy.id;
    dispatch(createNote(copy));
  }

  return (
    <ActionSheet
      zIndex={50}
      ref={actionSheetRef}
      id={props.sheetId}
      defaultOverlayOpacity={0.3}
      containerStyle={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 15,
        height: 200,
      }}
    >
      <FadeElement duration={500} visible={true}>
        <ColorPicker note={selectedNote} />
        <View
          style={{
            height: 5,
            marginTop: 20,
            marginHorizontal: 120,
            borderRadius: 2,
          }}
        />
        <HStack
          style={{
            height: 75,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: GlobalStyles.colors.lighterDark,
            borderRadius: 25,
            paddingHorizontal: 25,
            marginHorizontal: 20,
          }}
        >
          <RNBounceable style={styles.button}>
            <Icon
              onPress={handleConfirm}
              style={styles.icon}
              size={28}
              name="delete-outline"
            />
          </RNBounceable>
          <RNBounceable style={styles.button}>
            <Icon
              onPress={handleToggleFavorite}
              style={styles.icon}
              size={28}
              name="star-outline"
            />
          </RNBounceable>
          <RNBounceable style={styles.button}>
            <Icon
              onPress={() => {
                navigation.navigate(Routes.NoteEditor, selectedNote);
                closeDrawer();
              }}
              style={styles.icon}
              size={28}
              name="pencil-outline"
            />
          </RNBounceable>
          <RNBounceable style={styles.button}>
            <Icon
              onPress={handleDuplicate}
              style={styles.icon}
              size={28}
              name="content-duplicate"
            />
          </RNBounceable>
        </HStack>
      </FadeElement>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: GlobalStyles.colors.lightGreen,
  },
});

export default NoteActionsSheet;
