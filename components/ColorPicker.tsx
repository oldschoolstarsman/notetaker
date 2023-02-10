import { Text, VStack } from "@react-native-material/core";
import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ColorPickerColors } from "../constants";
import { useAppDispatch } from "../store";
import { updateNote } from "../store/notes-thunks";

function ColorPicker({ note }) {
  const colors = ColorPickerColors;
  const dispatch = useAppDispatch();
  return (
    <VStack center spacing={6}>
      <Text variant="caption">Add a little bit of color</Text>
      <ScrollView horizontal>
        {colors.map((color) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(updateNote({ ...note, color: color }));
            }}
            key={color}
            style={[
              styles.circle,
              {
                backgroundColor: color,
              },
            ]}
          />
        ))}
      </ScrollView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginHorizontal: 6,
  },
});

export default ColorPicker;
