import { Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import WeatherAnimation, {
  WeatherType,
} from "./animations/WeatherAnimation";

/* ---------------- PROPS ---------------- */
type Props = {
  city: string;
};

/* ---------------- DAY / NIGHT ---------------- */
const isNightTime = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour <= 5;
};

/* ---------------- GRADIENT ---------------- */
const getTempGradient = (
  temp: number,
  night: boolean
): readonly [string, string] => {
  if (night) return ["#020617", "#0f172a"]; // night
  if (temp <= 15) return ["#38bdf8", "#1e40af"];
  if (temp <= 25) return ["#22c55e", "#84cc16"];
  if (temp <= 35) return ["#facc15", "#f97316"];
  return ["#ef4444", "#b91c1c"];
};

/* ---------------- FORECAST ---------------- */
const forecast = [
  { day: "Mon", temp: 26, icon: "☀️" },
  { day: "Tue", temp: 28, icon: "🌤️" },
  { day: "Wed", temp: 24, icon: "⛈️" },
  { day: "Thu", temp: 23, icon: "☁️" },
  { day: "Fri", temp: 27, icon: "☀️" },
];

export default function WeatherCard({ city }: Props) {
  const temperature = 25;
  const weather: WeatherType = "storm";
  const night = isNightTime();

  const colors = getTempGradient(temperature, night);

  return (
    <Animated.View entering={FadeInUp.duration(600)} className="mt-6">
      <View className="rounded-3xl overflow-hidden shadow-xl">
        <LinearGradient
          colors={colors}
          style={{ padding: 24, overflow: "hidden" }}
        >
          {/* 🌦 Advanced Background Animation */}
          <WeatherAnimation weather={weather} isNight={night} />

          <Text className="text-white text-xl font-semibold text-center">
            {city}
          </Text>

          <Text className="text-white text-7xl font-extrabold text-center my-4">
            {temperature}°
          </Text>

          <Text className="text-white text-lg text-center mb-4">
            ⛈ Stormy
          </Text>

          <View className="flex-row justify-between px-4 mb-6">
            <View className="items-center">
              <Text className="text-white/80">Humidity</Text>
              <Text className="text-white font-bold">65%</Text>
            </View>
            <View className="items-center">
              <Text className="text-white/80">Wind</Text>
              <Text className="text-white font-bold">12 km/h</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {forecast.map((item, index) => (
              <View
                key={index}
                className="bg-white/20 px-4 py-3 rounded-xl mr-3 items-center w-20"
              >
                <Text className="text-white">{item.day}</Text>
                <Text className="text-2xl">{item.icon}</Text>
                <Text className="text-white font-semibold">
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
