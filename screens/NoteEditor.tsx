import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { HStack, Stack, TextInput, Text } from "@react-native-material/core";
import { GlobalStyles, Routes } from "../constants";
import ColorPicker from "../components/ColorPicker";
import { createNote, updateNote } from "../store/notes-thunks";
import { useAppDispatch } from "../store";

type NoteEditorProps = {
  navigation: any; // todo type
  route: any; // todo type
};

const NoteEditor: React.FC<NoteEditorProps> = ({ navigation, route }) => {
  const isNewNote = route.params === undefined;
  const [title, setTitle] = useState(
    isNewNote ? "" : (route.params.title as Note["title"])
  );
  const [note, setNote] = useState(
    isNewNote ? "" : (route.params.note as Note["note"])
  );

  const isNoteComplete = !!note && !!title;
  const dispatch = useAppDispatch();

  const handleSaveNote = async () => {
    if (isNewNote) {
      dispatch(createNote({ title, note }));
    } else {
      dispatch(
        updateNote({
          id: route.params.id,
          title,
          note,
          isFavorite: route.params.isFavorite,
        })
      );
    }
    navigation.navigate(Routes.NotesList);
  };

  const handleCancel = () => {
    navigation.navigate(Routes.NotesList);
  };

  return (
    <View style={styles.container}>
      <Stack fill spacing={8}>
        <TextInput
          color="black"
          placeholder="create a title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          variant="outlined"
        />
        <TextInput
          color="black"
          placeholder="create a note"
          inputContainerStyle={styles.noteDetails}
          value={note}
          multiline
          variant="outlined"
          onChangeText={(text) => setNote(text)}
        />
        <HStack spacing={6} justify="center">
          {!isNewNote && (
            <TouchableOpacity style={{ flex: 1 }} onPress={handleCancel}>
              <Text
                style={[styles.buttonText, { color: GlobalStyles.colors.red }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ flex: 1 }}
            disabled={!isNoteComplete}
            onPress={handleSaveNote}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isNoteComplete ? GlobalStyles.colors.black : "grey" },
              ]}
            >
              {"Save"}
            </Text>
          </TouchableOpacity>
        </HStack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  noteDetails: {
    alignItems: "flex-start",
    height: 400,
  },
  button: {
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
});

export default NoteEditor;
