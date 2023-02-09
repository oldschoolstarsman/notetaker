import { useContext, useRef } from "react";
import { HStack, VStack, Text } from "@react-native-material/core";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { GlobalStyles, Routes } from "../../constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { removeNote, updateNote } from "../../store/notes-thunks";
import { useAppDispatch } from "../../store";

function NoteActionsSheet(props: SheetProps<{ item: NoteDTO }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const item = props.payload?.item;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  function closeDrawer() {
    SheetManager.hide(props.sheetId);
  }

  function handleDeleteNote() {
    dispatch(removeNote(item.id));
    closeDrawer();
  }

  function handleToggleFavorite() {
    dispatch(updateNote({ ...item, isFavorite: !item.isFavorite }));
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
