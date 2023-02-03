import React from "react";
import { Stack, Avatar as RNAvatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function Avatar(url = "") {
  return (
    <RNAvatar
      image={{ uri: url }}
      icon={(props) => <Icon name="account" {...props} />}
    />
  );
}

export default Avatar;
