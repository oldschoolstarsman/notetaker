import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { NotesContext } from "../store/userNotes-context";
import { Routes } from "../constants";

type NoteEditorProps = {
  navigation: any; // todo type
  route: any; // todo type
};

const NoteEditor: React.FC<NoteEditorProps> = ({ navigation, route }) => {
  const isNewNote = route.params === undefined;
  const [title, setTitle] = useState(isNewNote ? "" : route.params.title);
  const [note, setNote] = useState(isNewNote ? "" : route.params.note);
  const isNoteComplete = !!note && !!title;
  const { addNote, editNote, deleteNote } = useContext(NotesContext);

  const handleSaveNote = () => {
    if (isNewNote) {
      addNote({ title, note, id: Math.floor(Math.random() * 10000) });
    } else {
      const saveNote = { title, note, id: route.params.id };
      editNote(saveNote);
    }
    navigation.navigate(Routes.NotesList);
  };

  const handleDelete = () => {
    deleteNote(route.params.id);
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
          disableElevation
          disabled={!isNoteComplete}
          title={isNewNote ? "save" : "edit"}
          onPress={handleSaveNote}
        />
        {!isNewNote && (
          <Button
            color="red"
            disableElevation
            disabled={!isNoteComplete}
            title={"delete"}
            onPress={handleDelete}
          />
        )}
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
