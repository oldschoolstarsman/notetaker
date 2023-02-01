import { useContext } from "react";
import { FlatList, View, Image, StyleSheet } from "react-native";
import {
  Pressable,
  HStack,
  Text,
  Box,
  Flex,
  TextInput,
} from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";

function NotesList({ route }) {
  const { notes } = useContext(NotesContext);
  function renderItem({ item }) {
    return (
      <Pressable style={styles.tile}>
        <View>
          <Text variant="h6">{item.title}</Text>
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
        <Image
          // style={styles.tinyLogo}
          source={require("../assets/empty-list.png")}
        />
      </Flex>
    );
  }
  return (
    <View style={styles.container}>
      {/* {route.params?.isSearch && (
        <TextInput
          color="black"
          placeholder="search notes"
          variant="outlined"
          // onChangeText={(text) => setNote(text)}
        />
      )} */}
      <FlatList
        numColumns={2}
        horizontal={false}
        renderItem={renderItem}
        data={notes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  tile: {
    flex: 1,
    padding: 4,
    margin: 3,
    width: 200,
    height: 230,
    backgroundColor: "#ccc",
  },
});

export default NotesList;
