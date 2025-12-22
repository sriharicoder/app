import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import WeatherAnimation, {
  WeatherType,
} from "./animations/WeatherAnimation";

/* ---------------- PROPS ---------------- */
type Props = {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: string;
  onSave?: () => void;   // ✅ optional
  saved?: boolean;      // ✅ optional
};

/* ---------------- DAY / NIGHT ---------------- */
const isNightTime = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour <= 5;
};

/* ---------------- WEATHER MAPPER ---------------- */
const mapConditionToWeather = (condition: string): WeatherType => {
  if (condition === "Rain") return "rainy";
  if (condition === "Clouds") return "cloudy";
  if (condition === "Thunderstorm") return "storm";
  return "sunny";
};

/* ---------------- GRADIENT ---------------- */
const getTempGradient = (
  temp: number,
  night: boolean
): readonly [string, string] => {
  if (night) return ["#020617", "#0f172a"];
  if (temp <= 15) return ["#38bdf8", "#1e40af"];
  if (temp <= 25) return ["#22c55e", "#84cc16"];
  if (temp <= 35) return ["#facc15", "#f97316"];
  return ["#ef4444", "#b91c1c"];
};

/* ---------------- FORECAST PREVIEW (STATIC) ---------------- */
const forecast = [
  { day: "Mon", temp: 26, icon: "☀️" },
  { day: "Tue", temp: 28, icon: "🌤️" },
  { day: "Wed", temp: 24, icon: "⛈️" },
  { day: "Thu", temp: 23, icon: "☁️" },
  { day: "Fri", temp: 27, icon: "☀️" },
];

export default function WeatherCard({
  city,
  temperature,
  humidity,
  wind,
  condition,
  onSave,
  saved,
}: Props) {
  const night = isNightTime();
  const weather: WeatherType = mapConditionToWeather(condition);
  const colors = getTempGradient(temperature, night);

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={{ marginTop: 24 }}>
      <View style={{ borderRadius: 28, overflow: "hidden" }}>
        <LinearGradient
          colors={colors}
          style={{ padding: 24, overflow: "hidden" }}
        >
          {/* 🌦 Animated Background */}
          <WeatherAnimation weather={weather} isNight={night} />

          {/* ❤️ SAVE / WISHLIST BUTTON */}
          {onSave && (
            <TouchableOpacity
              onPress={onSave}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                zIndex: 10,
              }}
            >
              <Ionicons
                name={saved ? "heart" : "heart-outline"}
                size={24}
                color={saved ? "#f43f5e" : "white"}
              />
            </TouchableOpacity>
          )}

          {/* CITY */}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {city}
          </Text>

          {/* TEMPERATURE */}
          <Text
            style={{
              color: "white",
              fontSize: 72,
              fontWeight: "800",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {Math.round(temperature)}°
          </Text>

          {/* CONDITION */}
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {condition}
          </Text>

          {/* STATS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginBottom: 20,
            }}
          >
            <Stat label="Humidity" value={`${humidity}%`} />
            <Stat label="Wind" value={`${wind} m/s`} />
          </View>

          {/* 5-DAY PREVIEW */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {forecast.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 16,
                  marginRight: 10,
                  alignItems: "center",
                  width: 70,
                }}
              >
                <Text style={{ color: "white", fontSize: 13 }}>
                  {item.day}
                </Text>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {item.temp}°
                </Text>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: 14,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
