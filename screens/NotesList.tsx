import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Routes } from "../constants";
import SearchBar from "react-native-dynamic-search-bar";
import FabButton from "../components/FabButton";
import { GlobalStyles } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchNotes } from "../store/notes-thunks";
import { Tabs } from "../components/TabNavigation";
import { notesSelector, searchQuerySelector } from "../store/notes-selectors";
import { setSearchQuery } from "../store/notes-reducer";
import FadeElement from "../components/FadeComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type NotesListProps = NativeStackScreenProps<RootStackParamList, "NotesList">;

const NotesList: React.FC<NotesListProps> = ({ navigation }) => {
  const { colors } = GlobalStyles;
  const notes = useAppSelector(notesSelector);
  const searchQuery = useAppSelector(searchQuerySelector);
  const isFetching = useAppSelector((state) => state.isFetching);
  const isLoading = useAppSelector((state) => state.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  function handleCreateNewNote() {
    navigation.navigate(Routes.NoteEditor);
    dispatch(setSearchQuery(""));
  }

  function handleSearchQuery(text) {
    dispatch(setSearchQuery(text));
  }

  if (isFetching) {
    return <Text>fetching data...</Text>;
  }

  if (notes.length === 0 && !isLoading) {
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
    <FadeElement visible={true} style={styles.container}>
      <View style={styles.searchbarContainer}>
        <SearchBar
          value={searchQuery}
          placeholder="Search notes ..."
          onChangeText={handleSearchQuery}
          onClearPress={() => dispatch(setSearchQuery(""))}
          onSearchPress={() => {
            dispatch(setSearchQuery(""));
          }}
          searchIconComponent={<Icon size={24} name="magnify" />}
          placeholderTextColor={GlobalStyles.colors.darkKey}
          textInputStyle={{
            fontFamily: "nunito",
          }}
          style={{
            backgroundColor: colors.lightGrey,
            width: "100%",
            height: 50,
          }}
        />
      </View>
      <Tabs />
      {renderFabButton()}
    </FadeElement>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  searchbarContainer: {
    height: 60,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
});

export default NotesList;
