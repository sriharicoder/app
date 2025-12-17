import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Wind() {
  const x = useSharedValue(-100);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(width + 100, { duration: 4000 }),
      -1,
      false
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    opacity: 0.25,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 120,
          width: 120,
          height: 4,
          borderRadius: 2,
          backgroundColor: "white",
        },
        style,
      ]}
    />
  );
}
