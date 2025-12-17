import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function Thunder() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.45, { duration: 100 }), // ⚡ softer flash
        withTiming(0, { duration: 300 }),
        withTiming(0.3, { duration: 100 }),  // ⚡ secondary flash
        withTiming(0, { duration: 2200 })    // pause
      ),
      -1,
      false
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          inset: 0,
          backgroundColor: "white",
        },
        style,
      ]}
    />
  );
}
