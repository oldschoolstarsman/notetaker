import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";
import { useState } from "react";
import { HStack, VStack } from "@react-native-material/core";
import { GlobalStyles, Routes } from "../constants";
import { createNote, updateNote } from "../store/notes-thunks";
import { useAppDispatch } from "../store";
import FadeElement from "../components/FadeComponent";
import { NoteDTO, RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../components/Button";

type NoteEditorProps = NativeStackScreenProps<RootStackParamList, "NoteEditor">;

const NoteEditor: React.FC<NoteEditorProps> = ({ navigation, route }) => {
  const isNewNote = route.params?.note === undefined;
  const [title, setTitle] = useState(
    isNewNote ? "" : (route.params?.title as NoteDTO["title"])
  );
  const [note, setNote] = useState(
    isNewNote ? "" : (route.params?.note as NoteDTO["note"])
  );

  const isNoteComplete = !!note && !!title;
  const dispatch = useAppDispatch();

  const handleSaveNote = () => {
    if (isNewNote) {
      dispatch(createNote({ title, note }));
    } else {
      const { id, isFavorite, color } = route.params as NoteDTO;
      dispatch(
        updateNote({
          id,
          color,
          title,
          note,
          isFavorite,
        })
      );
    }
    navigation.navigate(Routes.NotesList);
  };

  const handleCancel = () => {
    navigation.navigate(Routes.NotesList);
  };

  return (
    <FadeElement style={{ flex: 1 }} visible={true}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <VStack m={12} spacing={12}>
          <TextInput
            style={styles.input}
            placeholder="create a title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="create a note"
            value={note}
            multiline
            onChangeText={(text) => setNote(text)}
          />
          <HStack
            justify={isNewNote ? "center" : "between"}
            m={12}
            spacing={45}
          >
            {!isNewNote && (
              <Button
                action={handleCancel}
                variant="secondary"
                label="Cancel"
              />
            )}
            <Button
              disabled={!isNoteComplete}
              action={handleSaveNote}
              variant="primary"
              label="Save"
            />
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </FadeElement>
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
});

export default NoteEditor;
