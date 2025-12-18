import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function RainDrop() {
  // Randomized properties (stable per drop)
  const startX = useMemo(() => Math.random() * width, []);
  const length = useMemo(() => 8 + Math.random() * 12, []);
  const duration = useMemo(() => 800 + Math.random() * 700, []);
  const drift = useMemo(() => 20 + Math.random() * 40, []);

  const y = useSharedValue(-30);
  const x = useSharedValue(startX);

  useEffect(() => {
    y.value = withRepeat(
      withTiming(height + 40, { duration }),
      -1,
      false
    );

    x.value = withRepeat(
      withTiming(startX + drift, { duration }),
      -1,
      false
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotateZ: "-15deg" }, // 🌬 wind tilt
    ],
    opacity: 0.35,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          width: 1.5,
          height: length,
          backgroundColor: "#e0f2fe",
          borderRadius: 1,
        },
        style,
      ]}
    />
  );
}

export default function Rain() {
  return (
    <>
      {Array.from({ length: 45 }).map((_, i) => (
        <RainDrop key={i} />
      ))}
    </>
  );
}
