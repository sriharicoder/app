import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import type { ColorValue } from "react-native";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

type GradientColors = readonly [ColorValue, ColorValue];

type Props = {
  isNight: boolean;
  children: React.ReactNode;
};

export default function AnimatedGradient({ isNight, children }: Props) {
  const progress = useSharedValue(isNight ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isNight ? 1 : 0, { duration: 1500 });
  }, [isNight]);

  const style = useAnimatedStyle(() => ({
    opacity: 1,
  }));

  // ✅ STRONGLY TYPED TUPLES
  const nightColors: GradientColors = ["#020617", "#0f172a"];
  const dayColors: GradientColors = ["#38bdf8", "#1e3a8a"];

  const colors: GradientColors = isNight ? nightColors : dayColors;

  return (
    <AnimatedLG
      colors={colors} // ✅ NO ERROR
      style={[{ flex: 1, padding: 24 }, style]}
    >
      {children}
    </AnimatedLG>
  );
}
