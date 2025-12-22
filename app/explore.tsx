import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";

import AnimatedGradient from "../components/animations/AnimatedGradient";
import WeatherAnimation from "../components/animations/WeatherAnimation";
import { getCurrentWeather } from "../services/weatherApi";

export default function ExploreScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) {
      setLoading(false);
      setError("City not provided");
      return;
    }

    (async () => {
      try {
        const data = await getCurrentWeather(city);
        setWeather(data);
      } catch (e) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    })();
  }, [city]);

  /* 🌙 SAFE DAY / NIGHT */
  const isNight =
    weather
      ? Date.now() / 1000 < weather.sys.sunrise ||
        Date.now() / 1000 > weather.sys.sunset
      : false;

  return (
    <View style={{ flex: 1 }}>
      <AnimatedGradient isNight={isNight}>
        {/* 🌦 BACKGROUND */}
        <View style={styles.backgroundLayer}>
          {weather && (
            <WeatherAnimation
              weather={
                weather.weather[0].main === "Clouds" ? "cloudy" : "sunny"
              }
              isNight={isNight}
            />
          )}
        </View>

        {/* 🔙 HOME BUTTON */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.backButton}
        >
          <Ionicons name="home" size={22} color="white" />
        </TouchableOpacity>

        {/* ⏳ LOADING */}
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.infoText}>Loading weather…</Text>
          </View>
        )}

        {/* ❌ ERROR */}
        {!loading && error && (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* ✅ CONTENT */}
        {!loading && weather && (
          <View style={styles.content}>
            <Animated.Text entering={FadeInUp} style={styles.title}>
              🌍 Weather Insights
            </Animated.Text>

            <Animated.Text entering={FadeInUp.delay(100)} style={styles.subtitle}>
              Live weather details for {city}
            </Animated.Text>

            <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
              <RowTitle icon="speedometer" title="Wind Speed" />
              <Text style={styles.bigValue}>
                {weather.wind.speed} m/s
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
              <RowTitle icon="navigate" title="Wind Direction" />
              <Text style={styles.bigValue}>
                {weather.wind.deg}°
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400)} style={styles.card}>
              <RowTitle icon="thermometer" title="Feels Like" />
              <Text style={styles.bigValue}>
                {Math.round(weather.main.feels_like)}°
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(500)} style={styles.card}>
              <RowTitle icon={isNight ? "moon" : "sunny"} title="Time Mode" />
              <Text style={styles.bigValue}>
                {isNight ? "Night" : "Day"}
              </Text>
            </Animated.View>
          </View>
        )}
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

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  backgroundLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 8,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    color: "white",
    marginTop: 8,
  },

  errorText: {
    color: "#f87171",
    fontSize: 16,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
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
});
