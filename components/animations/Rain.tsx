import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function RainDrop() {
  const y = useSharedValue(-20);

  useEffect(() => {
    y.value = withRepeat(
      withTiming(350, { duration: 1200 }),
      -1
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: 0.45,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: 2,
          height: 16,
          backgroundColor: "#e0f2fe",
          left: Math.random() * width,
        },
        style,
      ]}
    />
  );
}

export default function Rain() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <RainDrop key={i} />
      ))}
    </>
  );
}
