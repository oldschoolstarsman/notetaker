import { useContext, useState } from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, Flex, AppBar } from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Routes } from "../constants";
import SearchBar from "react-native-dynamic-search-bar";
import FabButton from "../components/FabButton";
import { GlobalStyles } from "../constants";

function NotesList({ navigation }) {
  const { colors } = GlobalStyles;
  const { notes, isFetching } = useContext(NotesContext);
  const [searchInput, setSearchInput] = useState("");
  const [openSearch, setSearchOpen] = useState(false);
  const userSearching = searchInput !== "";
  const isFavorite = true;
  const filteredNotes = userSearching
    ? notes.filter((item) => {
        return (
          item.note.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.title.toLowerCase().includes(searchInput.toLowerCase())
        );
      })
    : notes;

  function handleOpenNote(id, title, note) {
    navigation.navigate(Routes.NoteEditor, { id, title, note });
  }

  function handleCreateNewNote() {
    setSearchInput("");
    navigation.navigate(Routes.NoteEditor);
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onLongPress={() => console.log("toto")}
        style={styles.tile}
        onPress={() => handleOpenNote(item.id, item.title, item.note)}
      >
        <View style={styles.favoriteBtn}>
          <Icon size={18} name={isFavorite ? "heart" : undefined} />
        </View>
        <Text
          numberOfLines={1}
          style={{ marginBottom: 4, width: "90%" }}
          variant="h6"
        >
          {item.title}
        </Text>
        <Text variant="body2">{item.note}</Text>
      </TouchableOpacity>
    );
  }

  if (isFetching) {
    return <Text>fetching data...</Text>;
  }

  if (notes.length === 0) {
    return (
      <View style={styles.container}>
        <Flex fill center>
          <Text style={{ marginVertical: 15 }} variant="h5">
            You don't have any notes
          </Text>
          <Image source={require("../assets/empty-list.png")} />
        </Flex>
        {renderFabButton()}
      </View>
    );
  }

  function renderSearchNoMatch() {
    return (
      <View style={styles.container}>
        <Text>no notes found..</Text>
      </View>
    );
  }

  function renderFabButton() {
    return (
      <FabButton
        position={{ bottom: 24, right: 24 }}
        iconName="plus"
        action={handleCreateNewNote}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <AppBar
          color="white"
          elevation={0}
          trailing={(props) =>
            !openSearch ? (
              <Icon
                onPress={() => setSearchOpen(true)}
                size={22}
                name="magnify"
                {...props}
              />
            ) : (
              <SearchBar
                placeholder="Search notes ..."
                onChangeText={setSearchInput}
                onClearPress={() => setSearchInput("")}
                onSearchPress={() => {
                  setSearchOpen(false);
                  setSearchInput("");
                }}
                searchIconComponent={<Icon size={22} name="magnify" />}
                style={{
                  backgroundColor: colors.lightGrey,
                  width: "100%",
                }}
              />
            )
          }
        />
        {filteredNotes.length === 0 && renderSearchNoMatch()}
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          horizontal={false}
          renderItem={renderItem}
          data={filteredNotes}
        />
        {renderFabButton()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyles.colors.white,
  },
  tile: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 6,
    margin: 4,
    flex: 1,
    height: 230,
    backgroundColor: GlobalStyles.colors.lightGrey,
    overflow: "hidden",
    borderRadius: 8,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 8,
  },
});

export default NotesList;
