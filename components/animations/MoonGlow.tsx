import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function MoonGlow() {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 4000 }),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 50,
          right: 50,
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: "#e5e7eb",
        },
        style,
      ]}
    />
  );
}
