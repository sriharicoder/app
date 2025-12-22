import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import AnimatedGradient from "../components/animations/AnimatedGradient";
import WeatherAnimation from "../components/animations/WeatherAnimation";
import MoreDetails from "../components/MoreDetails";
import { getFiveDayForecast } from "../services/weatherApi";

export default function DetailsScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();

  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  useEffect(() => {
    if (!city) return;

    (async () => {
      try {
        const data = await getFiveDayForecast(city);
        setForecast(data);
      } catch (e) {
        console.log("Forecast fetch error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [city]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          {/* 🌦 Background animation */}
          <View style={{ position: "absolute", inset: 0 }}>
            <WeatherAnimation weather="cloudy" isNight={isNight} />
          </View>

          {/* 🏠 HOME BUTTON */}
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={{
              position: "absolute",
              top: 50,
              left: 20,
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#2563eb",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              elevation: 8,
            }}
          >
            <Ionicons name="home" size={22} color="white" />
          </TouchableOpacity>

          {/* CONTENT */}
          <View
            style={{
              flex: 1,
              paddingTop: 110,
              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "800",
                color: "white",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              📊 Weather Details
            </Text>

            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <MoreDetails forecast={forecast} />
            )}
          </View>
        </AnimatedGradient>
      </View>
    </>
  );
}
