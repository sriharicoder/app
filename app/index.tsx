import { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AnimatedGradient from "../components/animations/AnimatedGradient";
import WeatherAnimation from "../components/animations/WeatherAnimation";
import WeatherCard from "../components/WeatherCard";
import MoreDetails from "../components/MoreDetails";
import SearchBox from "../components/SearchBox";

import {
  getCurrentWeather,
  getFiveDayForecast,
} from "../services/weatherApi";
import { getCurrentCity } from "../services/locationService";

/* ---------------- WEATHER TYPE ---------------- */

function mapWeatherType(main: string) {
  if (main === "Rain") return "rainy";
  if (main === "Clouds") return "cloudy";
  if (main === "Thunderstorm") return "storm";
  return "sunny";
}

/* ---------------- CLEAN CITY NAME ---------------- */

function normalizeCity(input: string) {
  return input.split(",")[0].trim(); // "Chennai, TN, India" → "Chennai"
}

export default function Index() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  /* ---------------- FETCH WEATHER ---------------- */

  async function fetchWeather(selectedCity = city) {
  const cleanCity = selectedCity.split(",")[0].trim(); // 👈 FIX

  if (!cleanCity) return;

  try {
    setLoading(true);
    setError("");

    const [weatherData, forecastData] = await Promise.all([
      getCurrentWeather(cleanCity),
      getFiveDayForecast(cleanCity),
    ]);

    setWeather(weatherData);
    setForecast(forecastData);
  } catch {
    setError("City not found");
  } finally {
    setLoading(false);
  }
}


  /* ---------------- GPS (SAFE) ---------------- */

  useEffect(() => {
  (async () => {
    const detectedCity = await getCurrentCity();

    if (detectedCity) {
      setCity(detectedCity);
      fetchWeather(detectedCity); // ✅ auto weather
    } else {
      // 🟡 GPS failed → fallback city
      const fallbackCity = "Chennai";
      setCity(fallbackCity);
      fetchWeather(fallbackCity);
    }
  })();
}, []);


  const condition = weather?.weather?.[0]?.main ?? "Clear";
  const weatherType = mapWeatherType(condition);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          <View style={{ position: "absolute", inset: 0 }}>
            <WeatherAnimation weather={weatherType} isNight={isNight} />
          </View>

          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={weather ? [weather] : []}
              keyExtractor={() => "weather"}
              contentContainerStyle={{ paddingTop: 24, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}

              ListHeaderComponent={
                <>
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

                  <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    <SearchBox
                      city={city}
                      setCity={setCity}
                      onPress={() => fetchWeather(city)}
                    />
                  </View>

                  {loading && (
                    <ActivityIndicator size="large" color="white" />
                  )}

                  {error ? (
                    <Text style={{ color: "red", textAlign: "center" }}>
                      {error}
                    </Text>
                  ) : null}
                </>
              }

              renderItem={() =>
                weather && forecast ? (
                  <View style={{ marginHorizontal: 14 }}>
                    <WeatherCard
                      city={weather.name}
                      temperature={weather.main.temp}
                      humidity={weather.main.humidity}
                      wind={weather.wind.speed}
                      condition={condition}
                    />

                   <MoreDetails forecast={forecast} mode="preview" />

                  </View>
                ) : null
              }
            />

            {/* Floating buttons */}
            <View style={{ position: "absolute", bottom: 30, right: 20 }}>
              <Ionicons.Button
                name="compass"
                backgroundColor="#2563eb"
                borderRadius={30}
                onPress={() => router.push("/explore")}
              />
            </View>

            <View style={{ position: "absolute", bottom: 30, left: 20 }}>
              <Ionicons.Button
                name="stats-chart"
                backgroundColor="#facc15"
                color="#1e293b"
                borderRadius={30}
                onPress={() => router.push("/details")}
              />
            </View>
          </SafeAreaView>
        </AnimatedGradient>
      </View>
    </>
  );
}
