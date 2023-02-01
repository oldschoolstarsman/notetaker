import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";
import { Routes } from "../constants";

type NoteEditorProps = {
  navigation: any; // todo type
};

const NoteEditor: React.FC<NoteEditorProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const isNoteComplete = !!note && !!title;

  const { addNote } = useContext(NotesContext);

  const handleSaveNote = () => {
    addNote({ title, note });
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
          placeholder="what I want save"
          inputContainerStyle={styles.noteDetails}
          value={note}
          multiline
          variant="outlined"
          onChangeText={(text) => setNote(text)}
        />
        <Button
          color="black"
          disabled={!isNoteComplete}
          title="save"
          onPress={handleSaveNote}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  noteDetails: {
    alignItems: "flex-start",
    height: 500,
  },
});

export default NoteEditor;
