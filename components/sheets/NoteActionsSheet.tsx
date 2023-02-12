import { useRef } from "react";
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
import { View } from "react-native";
import ColorPicker from "../ColorPicker";
import { setSelectItem } from "../../store/notes-reducer";

function NoteActionsSheet(
  props: SheetProps<{ item: NoteDTO; updateNote: () => void }>
) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const item = props.payload?.item;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  function closeDrawer() {
    SheetManager.hide(props.sheetId);
    dispatch(setSelectItem(null));
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
    dispatch(removeNote(item.id));
    closeDrawer();
  }

  function handleToggleFavorite() {
    console.log(item);
    dispatch(updateNote({ ...item, isFavorite: !item.isFavorite }));
    closeDrawer();
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
      }}
    >
      <ColorPicker note={item} />
      <View
        style={{
          height: 5,
          backgroundColor: GlobalStyles.colors.lightGrey,
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
        }}
      >
        <VStack center>
          <Icon
            onPress={handleConfirm}
            color={GlobalStyles.colors.red}
            size={28}
            name="delete-outline"
          />
          <Text color={GlobalStyles.colors.red} variant="caption">
            Delete
          </Text>
        </VStack>
        <VStack center>
          <Icon
            onPress={handleToggleFavorite}
            color={GlobalStyles.colors.black}
            size={28}
            name="star-outline"
          />
          <Text color={GlobalStyles.colors.black} variant="caption">
            Favourite
          </Text>
        </VStack>
        <VStack center>
          <Icon
            onPress={() => {
              navigation.navigate(Routes.NoteEditor, item);
              closeDrawer();
            }}
            color={GlobalStyles.colors.accent}
            size={28}
            name="pencil-outline"
          />
          <Text color={GlobalStyles.colors.accent} variant="caption">
            Edit
          </Text>
        </VStack>
      </HStack>
    </ActionSheet>
  );
}

export default NoteActionsSheet;
