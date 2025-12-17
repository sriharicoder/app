import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Clouds() {
  const x = useSharedValue(-150);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(width + 150, { duration: 18000 }),
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
          top: 70,
          width: 200,
          height: 60,
          borderRadius: 50,
          backgroundColor: "white",
        },
        style,
      ]}
    />
  );
}
