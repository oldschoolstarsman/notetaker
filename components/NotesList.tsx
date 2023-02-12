import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Flex, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SheetManager } from "react-native-actions-sheet";
import { updateNote } from "../store/notes-thunks";
import { setSelectItem } from "../store/notes-reducer";
import { GlobalStyles, Routes } from "../constants";
import { filteredFavoriteNotes, filteredNotes } from "../store/notes-selectors";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchQuery } from "../store/notes-reducer";
import FadeElement from "./FadeComponent";

function NotesList({ navigation, route }) {
  const notes = useAppSelector(filteredNotes);
  const selected = useAppSelector((state) => state.selectedNote);
  const favoriteNotes = useAppSelector(filteredFavoriteNotes);
  const data = route.name === "All" ? notes : favoriteNotes;
  const dispatch = useAppDispatch();

  function openNoteActionsBottomDrawer(item: NoteDTO) {
    SheetManager.show("note-actions-sheet", {
      payload: { item, setColor: () => updateNote(item) },
      onClose: () => dispatch(setSelectItem(null)),
    });
  }

  function closeBottomSheetDrawer() {
    dispatch(setSelectItem(null));
    SheetManager.hide("note-actions-sheet");
  }

  function handleOpenNote(item) {
    navigation.navigate(Routes.NoteEditor, item);
    closeBottomSheetDrawer();
    dispatch(setSearchQuery(""));
  }

  function renderItem({ item }: { item: NoteDTO }) {
    const isFavorite = item.isFavorite;
    const isSelected = item.id === selected;
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onLongPress={() => {
          openNoteActionsBottomDrawer(item);
          dispatch(setSelectItem(item.id));
        }}
        onPress={() => handleOpenNote(item)}
      >
        <View
          style={[
            styles.tile,
            isSelected
              ? {
                  borderWidth: 1,
                  borderColor: GlobalStyles.colors.lighterDark,
                }
              : undefined,
            {
              backgroundColor: item.color || GlobalStyles.colors.lightGrey,
              shadowColor: item.color,
            },
          ]}
        >
          <FadeElement visible={isFavorite} style={styles.favoriteBtn}>
            <Icon
              color={GlobalStyles.colors.lighterDark}
              size={18}
              name={isFavorite ? "star-outline" : undefined}
            />
          </FadeElement>

          <View style={{ padding: 5 }}>
            <Text
              numberOfLines={1}
              style={{
                marginBottom: 2,
                width: "90%",
                fontFamily: "nunito",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "nunito" }}>
              {item.note}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (data.length === 0) {
    return (
      <Flex fill style={{ backgroundColor: GlobalStyles.colors.white }} center>
        <Image source={require("../assets/oops.png")} />
      </Flex>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
        renderItem={renderItem}
        data={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 8,
    backgroundColor: GlobalStyles.colors.white,
  },
  tile: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 6,
    margin: 4,
    flex: 1,
    maxHeight: 200,
    overflow: "hidden",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 8,
  },
});

export default NotesList;
