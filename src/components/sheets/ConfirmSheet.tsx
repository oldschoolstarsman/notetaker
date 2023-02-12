import { useRef, useState } from "react";
import { HStack, VStack, Text, Button } from "@react-native-material/core";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { GlobalStyles } from "../../constants";
import { Pressable } from "react-native";

function ConfirmSheet(props: SheetProps<{ message: string }>) {
  const confirmSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={props.sheetId}
      ref={confirmSheetRef}
      defaultOverlayOpacity={0.3}
      containerStyle={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <VStack
        style={{
          height: 120,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            color: GlobalStyles.colors.lighterDark,
            fontWeight: "bold",
          }}
        >
          {props.payload?.message}
        </Text>
        <HStack m={3} spacing={10}>
          <Pressable
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              backgroundColor: GlobalStyles.colors.yellow,
              borderColor: GlobalStyles.colors.lighterDark,
              borderWidth: 0.5,
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.22,
              shadowRadius: 1,
              elevation: 3,
            }}
            onPress={() => {
              SheetManager.hide(props.sheetId, {
                payload: false,
              });
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Hell, no!</Text>
          </Pressable>
          <Pressable
            style={{
              justifyContent: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              backgroundColor: GlobalStyles.colors.lighterDark,
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2,
              elevation: 6,
            }}
            onPress={() => {
              SheetManager.hide(props.sheetId, {
                payload: true,
              });
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: GlobalStyles.colors.white }}
            >
              Yes, please!
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </ActionSheet>
  );
}

export default ConfirmSheet;
