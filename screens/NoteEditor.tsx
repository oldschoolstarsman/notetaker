import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { HStack, Stack, TextInput, Text } from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";
import { GlobalStyles, Routes } from "../constants";
import { storeNote, updateNote } from "../api/notesApi";

type NoteEditorProps = {
  navigation: any; // todo type
  route: any; // todo type
};

const NoteEditor: React.FC<NoteEditorProps> = ({ navigation, route }) => {
  const isNewNote = route.params === undefined;
  const [title, setTitle] = useState(isNewNote ? "" : route.params.title);
  const [note, setNote] = useState(isNewNote ? "" : route.params.note);
  const isNoteComplete = !!note && !!title;
  const { addNote, editNote } = useContext(NotesContext);

  const handleSaveNote = async () => {
    try {
      if (isNewNote) {
        const noteData = { title, note };
        const id = await storeNote(noteData);
        addNote({ id, ...noteData });
      } else {
        const noteId = route.params.id;
        editNote({ id: noteId, title, note });
        updateNote({ id: noteId, title, note });
      }
    } catch (error) {
      console.log(error);
    }

    navigation.navigate(Routes.NotesList);
  };

  const handleCancel = () => {
    navigation.navigate(Routes.NotesList);
  };

  return (
    <View style={styles.container}>
      <Stack spacing={8}>
        <TextInput
          color="black"
          placeholder="title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          variant="outlined"
        />
        <TextInput
          color="black"
          placeholder="what I want to save"
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
    height: 500,
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
