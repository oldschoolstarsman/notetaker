import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, Flex, AppBar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Routes } from "../constants";
import SearchBar from "react-native-dynamic-search-bar";
import FabButton from "../components/FabButton";
import { GlobalStyles } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchNotes } from "../store/notes-thunks";
import { Tabs } from "../components/TabNavigation";
import { notesSelector } from "../store/notes-selectors";
import { setSearchQuery } from "../store/notes-reducer";

function NotesList({ navigation }) {
  const { colors } = GlobalStyles;
  const notes = useAppSelector(notesSelector);
  const isFetching = useAppSelector((state) => state.isFetching);
  const [openSearch, setSearchOpen] = useState(false);
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
    <View style={styles.container}>
      <AppBar
        color="white"
        elevation={0}
        trailing={(props) =>
          !openSearch ? (
            <Icon
              onPress={() => setSearchOpen(true)}
              name="magnify"
              {...props}
            />
          ) : (
            <SearchBar
              placeholder="Search notes ..."
              onChangeText={handleSearchQuery}
              onClearPress={() => dispatch(setSearchQuery(""))}
              onSearchPress={() => {
                setSearchOpen(false);
                dispatch(setSearchQuery(""));
              }}
              searchIconComponent={<Icon size={24} name="magnify" />}
              style={{
                backgroundColor: colors.lightGrey,
                width: "100%",
              }}
            />
          )
        }
      />
      <Tabs />
      {renderFabButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  tile: {
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 6,
    margin: 4,
    flex: 1,
    height: 230,
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
