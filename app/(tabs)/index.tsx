import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AnimatedGradient from "../../components/animations/AnimatedGradient";
import WeatherAnimation from "../../components/animations/WeatherAnimation";
import WeatherCard from "../../components/WeatherCard";

export default function Index() {
  const [city, setCity] = useState("");

  // 🌙 Day / Night detection
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  return (
    <View style={{ flex: 1 }}>
      {/* 🌈 FULL SCREEN ANIMATED BACKGROUND */}
      <AnimatedGradient isNight={isNight}>
        {/* 🔽 BACKGROUND WEATHER EFFECTS (NON-INTERACTIVE) */}
        <View
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <WeatherAnimation weather="storm" isNight={isNight} />
        </View>

        {/* 🔼 UI CONTENT */}
        <View className="flex-1 px-5 pt-10">
          {/* Title */}
          <Text className="text-3xl font-extrabold text-white text-center mb-6">
            🌤 Smart Weather App
          </Text>

          {/* 🔍 SEARCH CARD */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: 16,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6,
              marginBottom: 18,
            }}
          >
            <TextInput
              placeholder="Enter city name"
              placeholderTextColor="#94a3b8"
              value={city}
              onChangeText={setCity}
              style={{
                backgroundColor: "#f1f5f9",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                color: "#0f172a",
                marginBottom: 12,
              }}
              returnKeyType="search"
            />

            <TouchableOpacity
              disabled={!city.trim()}
              style={{
                backgroundColor: city.trim()
                  ? "#2563eb"
                  : "#94a3b8",
                paddingVertical: 14,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Check Weather
              </Text>
            </TouchableOpacity>
          </View>

          {/* 🌦 WEATHER CARD */}
          <WeatherCard city={city || "Sankarandampalayam"} />
        </View>
      </AnimatedGradient>
    </View>
  );
}
