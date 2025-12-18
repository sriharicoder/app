import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import AnimatedGradient from "../../components/animations/AnimatedGradient";
import WeatherAnimation from "../../components/animations/WeatherAnimation";

export default function ExploreScreen() {
  const hour = new Date().getHours();
  const autoNight = hour >= 18 || hour <= 5;

  const [isNight, setIsNight] = useState(autoNight);
  const [wind, setWind] = useState(12);
  const [feelsLike, setFeelsLike] = useState(false);

  /* 🧭 Compass rotation */
  const rotate = useSharedValue(0);

  rotate.value = withRepeat(
    withTiming(360, { duration: 6000 }),
    -1,
    false
  );

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedGradient isNight={isNight}>
        {/* 🌦 Background animation */}
        <View style={styles.backgroundLayer}>
          <WeatherAnimation weather="cloudy" isNight={isNight} />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* TITLE */}
          <Animated.Text entering={FadeInUp.duration(500)} style={styles.title}>
            🌍 Explore Weather
          </Animated.Text>

          <Animated.Text
            entering={FadeInUp.delay(150)}
            style={styles.subtitle}
          >
            Interactive weather feature demos
          </Animated.Text>

          {/* 🌬 WIND SPEED */}
          <Animated.View entering={FadeInUp.delay(250)} style={styles.card}>
            <RowTitle icon="speedometer" title="Wind Speed" />
            <Text style={styles.bigValue}>{wind} km/h</Text>

            <PrimaryButton
              label="Detect Wind Speed"
              onPress={() => setWind(Math.floor(5 + Math.random() * 30))}
            />
          </Animated.View>

          {/* 🧭 WIND DIRECTION */}
          <Animated.View entering={FadeInUp.delay(350)} style={styles.card}>
            <RowTitle icon="navigate" title="Wind Direction" />

            <Animated.View style={[compassStyle, styles.compass]}>
              <Ionicons name="navigate" size={42} color="white" />
            </Animated.View>

            <Text style={styles.hint}>Live rotating compass (demo)</Text>
          </Animated.View>

          {/* 🌡 FEELS LIKE */}
          <Animated.View entering={FadeInUp.delay(450)} style={styles.card}>
            <RowTitle icon="thermometer" title="Feels Like Temperature" />

            <Text style={styles.bigValue}>
              {feelsLike ? "Feels like 31°" : "Actual 29°"}
            </Text>

            <PrimaryButton
              label="Toggle Feels Like"
              onPress={() => setFeelsLike(!feelsLike)}
            />
          </Animated.View>

          {/* 🌙 DAY / NIGHT */}
          <Animated.View entering={FadeInUp.delay(550)} style={styles.card}>
            <RowTitle
              icon={isNight ? "moon" : "sunny"}
              title="Day / Night Mode"
            />

            <PrimaryButton
              label={isNight ? "Switch to Day" : "Switch to Night"}
              onPress={() => setIsNight(!isNight)}
            />
          </Animated.View>
        </View>
      </AnimatedGradient>
    </View>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function RowTitle({ icon, title }: { icon: any; title: string }) {
  return (
    <View style={styles.rowTitle}>
      <Ionicons name={icon} size={18} color="white" />
      <Text style={styles.rowTitleText}>{title}</Text>
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
  },

  bigValue: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },

  hint: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    textAlign: "center",
  },

  rowTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  rowTitleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },

  compass: {
    marginVertical: 10,
    alignSelf: "center",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  primaryButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
