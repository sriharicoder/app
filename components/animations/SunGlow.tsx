import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function SunGlow() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.35,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 40,
          right: 40,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "#fde68a",
        },
        style,
      ]}
    />
  );
}
