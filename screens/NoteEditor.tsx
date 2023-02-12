import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import { useState } from "react";
import {
  HStack,
  Stack,
  Text,
  Pressable,
  VStack,
} from "@react-native-material/core";
import { GlobalStyles, Routes } from "../constants";
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

  const handleSaveNote = () => {
    if (isNewNote) {
      dispatch(createNote({ title, note }));
    } else {
      dispatch(
        updateNote({
          id: route.params.id,
          color: route.params.color,
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <VStack m={12} spacing={12}>
        <TextInput
          style={styles.input}
          placeholder="create a title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="create a note"
          value={note}
          multiline
          onChangeText={(text) => setNote(text)}
        />
        <HStack m={12} spacing={45} justify="center">
          {!isNewNote && (
            <Pressable
              style={{
                alignItems: "center",
                width: 150,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 16,
                backgroundColor: GlobalStyles.colors.yellow,
                borderColor: GlobalStyles.colors.black,
                borderWidth: 0.5,
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.22,
                shadowRadius: 1,
                elevation: 3,
              }}
              onPress={handleCancel}
            >
              <Text style={{ fontWeight: "bold", fontFamily: "nunito" }}>
                Cancel
              </Text>
            </Pressable>
          )}
          <Pressable
            style={{
              alignItems: "center",
              width: 150,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              backgroundColor: GlobalStyles.colors.black,
              borderColor: GlobalStyles.colors.black,
              borderWidth: 0.5,
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.22,
              shadowRadius: 1,
              elevation: 3,
            }}
            disabled={!isNoteComplete}
            onPress={handleSaveNote}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "nunito",
                color: isNoteComplete
                  ? GlobalStyles.colors.white
                  : GlobalStyles.colors.darkKey,
              }}
            >
              Save
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    borderColor: GlobalStyles.colors.lightGrey,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 12,
    backgroundColor: "rgb(247, 249, 250)",
    fontFamily: "nunito",
  },
  noteDetails: {
    // paddingVertical: 10,
    // alignItems: "flex-start",
    // height: 400,
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
