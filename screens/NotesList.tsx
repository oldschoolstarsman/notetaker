import { useContext, useState } from "react";
import { FlatList, View, Image, StyleSheet } from "react-native";
import {
  Pressable,
  Text,
  Flex,
  TextInput,
  Button,
} from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Routes } from "../constants";

function NotesList({ route, navigation }) {
  const { notes } = useContext(NotesContext);
  const [searchInput, setSearchInput] = useState("");
  const userSearching = searchInput !== "";
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
      <Pressable
        style={styles.tile}
        onPress={() => handleOpenNote(item.id, item.title, item.note)}
      >
        <View>
          <Text style={{ marginBottom: 4 }} variant="h6">
            {item.title}
          </Text>
          <Text variant="body2">{item.note}</Text>
        </View>
      </Pressable>
    );
  }

  if (notes.length === 0) {
    return (
      <Flex fill center>
        <Text style={{ marginVertical: 15 }} variant="h5">
          You don't have any notes
        </Text>
        <Image source={require("../assets/empty-list.png")} />
        <Button
          disableElevation
          style={{ marginVertical: 25 }}
          leading={(props) => <Icon name="plus" {...props} />}
          color="black"
          title="Add note"
          onPress={() => navigation.navigate(Routes.NoteEditor)}
        />
      </Flex>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        trailing={(props) => (
          <Icon
            onPress={() => setSearchInput("")}
            name={userSearching ? "arrow-left" : "magnify"}
            {...props}
          />
        )}
        color="black"
        placeholder="search notes"
        variant="outlined"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
        renderItem={renderItem}
        data={filteredNotes}
      />
      {!userSearching && (
        <Button
          disableElevation
          style={{ marginVertical: 32, width: 150, alignSelf: "center" }}
          leading={(props) => <Icon name="plus" {...props} />}
          color="black"
          title="Add note"
          onPress={handleCreateNewNote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  tile: {
    padding: 6,
    margin: 4,
    width: 200,
    height: 230,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    borderRadius: 8,
  },
});

export default NotesList;
