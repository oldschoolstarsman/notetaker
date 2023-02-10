import { useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import NotesList from "./NotesList";

const TabViews = () => {
  const layout = useWindowDimensions();
  const [routes, _] = useState([
    { key: "first", title: "All notes" },
    { key: "second", title: "Favorites" },
  ]);
  const [index, setIndex] = useState(0);

  function handleIndexChange(index) {
    setIndex(index);
  }

  function renderTabBar(props) {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <TabView
      navigationState={{ routes, index }}
      renderScene={SceneMap({
        first: NotesList,
        second: NotesList,
      })}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default TabViews;
