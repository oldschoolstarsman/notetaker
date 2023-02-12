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
import RNBounceable from "@freakycoder/react-native-bounceable";
import FadeElement from "../FadeComponent";
import { Spacer } from "react-native-flex-layout";

function NoteActionsSheet(
  props: SheetProps<{ item: NoteDTO; updateNote: () => void }>
) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const item = props.payload?.item;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
    dispatch(removeNote(item.id));
    closeDrawer();
  }

  function handleToggleFavorite() {
    dispatch(updateNote({ ...item, isFavorite: !item.isFavorite }));
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
        <ColorPicker note={item} />
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
          <RNBounceable
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onPress={handleConfirm}
              color={GlobalStyles.colors.lightGreen}
              size={28}
              name="delete-outline"
            />
          </RNBounceable>
          <RNBounceable
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onPress={handleToggleFavorite}
              color={GlobalStyles.colors.lightGreen}
              size={28}
              name="star-outline"
            />
          </RNBounceable>
          <RNBounceable
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              onPress={() => {
                navigation.navigate(Routes.NoteEditor, item);
                closeDrawer();
              }}
              color={GlobalStyles.colors.lightGreen}
              size={28}
              name="pencil-outline"
            />
          </RNBounceable>
        </HStack>
      </FadeElement>
    </ActionSheet>
  );
}

export default NoteActionsSheet;
