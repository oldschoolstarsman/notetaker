import { useRef } from "react";
import { HStack, VStack, Text, Flex } from "@react-native-material/core";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { GlobalStyles } from "../../constants";
import Button from "../Button";

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
        m={12}
        spacing={12}
        style={{
          height: 120,
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            color: GlobalStyles.colors.lighterDark,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          {props.payload?.message}
        </Text>
        <HStack justify="between" m={12} spacing={45}>
          <Button
            variant="secondary"
            label="Yes, please!"
            action={() =>
              SheetManager.hide(props.sheetId, {
                payload: false,
              })
            }
          />
          <Button
            variant="primary"
            label="Hell, no!"
            action={() =>
              SheetManager.hide(props.sheetId, {
                payload: true,
              })
            }
          />
        </HStack>
      </VStack>
    </ActionSheet>
  );
}

export default ConfirmSheet;
