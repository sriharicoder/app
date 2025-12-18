import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";

import AnimatedGradient from "../../components/animations/AnimatedGradient";
import WeatherAnimation from "../../components/animations/WeatherAnimation";
import WeatherCard from "../../components/WeatherCard";
import { FiveDayForecast } from "../../components/BottomSection"; // ✅ IMPORT

export default function Index() {
  const [city, setCity] = useState("");

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          {/* 🌦 Background animation */}
          <View
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <WeatherAnimation weather="storm" isNight={isNight} />
          </View>

          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 24, paddingBottom: 30 }}
            >
              {/* TITLE */}
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                🌤 Smart Weather App
              </Text>

              {/* SEARCH CARD */}
              <View
                style={{
                  marginHorizontal: 20,
                  backgroundColor: "rgba(255,255,255,0.95)",
                  borderRadius: 24,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  placeholder="Enter city name"
                  value={city}
                  onChangeText={setCity}
                  style={{
                    backgroundColor: "#f1f5f9",
                    borderRadius: 16,
                    padding: 14,
                    marginBottom: 12,
                  }}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "#2563eb",
                    paddingVertical: 14,
                    borderRadius: 16,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Check Weather
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 🌦 SAME WIDTH SECTION */}
              <View style={{ marginHorizontal: 14 }}>
                <WeatherCard city={city || "Sankarandampalayam"} />

                {/* ✅ 5-DAY PREVIEW ONLY */}
                <FiveDayForecast showDetailsLink />
              </View>
            </ScrollView>
          </SafeAreaView>
        </AnimatedGradient>
      </View>
    </>
  );
}
