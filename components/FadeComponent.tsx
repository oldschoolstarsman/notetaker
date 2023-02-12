import { useEffect, useState } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

type FadeElementProps = {
  children: JSX.Element | JSX.Element[];
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

const FadeElement: React.FC<FadeElementProps> = ({
  children,
  visible,
  style,
  duration,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration ?? 100,
        useNativeDriver: true,
      }).start();
    } else if (!visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration ?? 100,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        ...style,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeElement;
