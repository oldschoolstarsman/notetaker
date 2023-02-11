import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SheetManager } from "react-native-actions-sheet";
import { updateNote } from "../store/notes-thunks";
import { GlobalStyles, Routes } from "../constants";
import { filteredFavoriteNotes, filteredNotes } from "../store/notes-selectors";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchQuery } from "../store/notes-reducer";

function NotesList({ navigation, route }) {
  const notes = useAppSelector(filteredNotes);
  const favoriteNotes = useAppSelector(filteredFavoriteNotes);
  const data = route.name === "All" ? notes : favoriteNotes;
  const dispatch = useAppDispatch();

  function openNoteActionsBottomDrawer(item: NoteDTO) {
    SheetManager.show("note-actions-sheet", {
      payload: { item, setColor: () => updateNote(item) },
    });
  }

  function closeBottomSheetDrawer() {
    SheetManager.hide("note-actions-sheet");
  }

  function handleOpenNote(item) {
    navigation.navigate(Routes.NoteEditor, item);
    closeBottomSheetDrawer();
    dispatch(setSearchQuery(""));
  }

  function renderItem({ item }: { item: NoteDTO }) {
    const isFavorite = item.isFavorite;
    return (
      <TouchableWithoutFeedback
        onLongPress={() => openNoteActionsBottomDrawer(item)}
        onPress={() => handleOpenNote(item)}
      >
        <View
          style={[
            styles.tile,
            {
              backgroundColor: item.color || GlobalStyles.colors.lightGrey,
              shadowColor: item.color,
            },
          ]}
        >
          <View style={styles.favoriteBtn}>
            <Icon
              color={GlobalStyles.colors.accent}
              size={18}
              name={isFavorite ? "star-outline" : undefined}
            />
          </View>
          <View style={{ padding: 5 }}>
            <Text
              numberOfLines={1}
              style={{
                marginBottom: 2,
                width: "90%",
                fontWeight: "400",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 14 }}>{item.note}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>no notes found..</Text>
      </View>
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
    paddingTop: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  tile: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 6,
    margin: 4,
    flex: 1,
    maxWidth: "50%",
    maxHeight: 200,
    overflow: "hidden",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 6,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 8,
  },
});

export default NotesList;
