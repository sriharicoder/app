import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

/* ---------------- WEATHER MAPPER ---------------- */

function mapWeatherType(main: string) {
  if (main === "Rain") return "rainy";
  if (main === "Clouds") return "cloudy";
  if (main === "Thunderstorm") return "storm";
  return "sunny";
}

export default function Index() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  /* ---------------- LOAD SAVED LOCATIONS ---------------- */

  useEffect(() => {
    AsyncStorage.getItem("savedCities").then(data => {
      if (data) setSavedCities(JSON.parse(data));
    });
  }, []);

  /* ---------------- GPS DEFAULT CITY ---------------- */

  useEffect(() => {
    (async () => {
      const detected = await getCurrentCity();
      const defaultCity = detected || "Chennai"; // ✅ fallback
      if (detected) {
        setCity(detected);
        fetchWeather(detected);
      }
    })();
  }, []);

  /* ---------------- FETCH WEATHER ---------------- */

  async function fetchWeather(selectedCity = city) {
    if (!selectedCity.trim()) return;

    try {
      setLoading(true);
      setError("");

      const [w, f] = await Promise.all([
        getCurrentWeather(selectedCity),
        getFiveDayForecast(selectedCity),
      ]);

      setWeather(w);
      setForecast(f);
      setCity(selectedCity);
    } catch {
      setError("Weather not found");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
      setShowSearch(false);
    }
  }

  /* ---------------- SAVE / REMOVE LOCATION ---------------- */

  async function toggleSave(cityName: string) {
    let updated = [...savedCities];

    if (updated.includes(cityName)) {
      updated = updated.filter(c => c !== cityName);
    } else {
      updated.push(cityName);
    }

    setSavedCities(updated);
    await AsyncStorage.setItem("savedCities", JSON.stringify(updated));
  }

  const condition = weather?.weather?.[0]?.main ?? "Clear";
  const weatherType = mapWeatherType(condition);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          {/* 🌦 Background animation */}
          <View style={{ position: "absolute", inset: 0 }}>
            <WeatherAnimation weather={weatherType} isNight={isNight} />
          </View>

          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={weather ? [weather] : []}
              keyExtractor={() => "weather"}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 140 }}

              ListHeaderComponent={
                <>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "800",
                      color: "white",
                      textAlign: "center",
                      marginVertical: 20,
                    }}
                  >
                    🌤 Smart Weather
                  </Text>

                  {/* SAVED LOCATIONS */}
                  {savedCities.length > 0 && (
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 14 }}>
                      {savedCities.map(item => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => fetchWeather(item)}
                          onLongPress={() => toggleSave(item)}
                          style={{
                            backgroundColor: "rgba(255,255,255,0.25)",
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 20,
                            margin: 6,
                          }}
                        >
                          <Text style={{ color: "white" }}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {loading && <ActivityIndicator size="large" color="white" />}
                  {error ? (
                    <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
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
                      onSave={() => toggleSave(weather.name)}
                      saved={savedCities.includes(weather.name)}
                    />

                    {/* ONLY 5-DAY FORECAST */}
                    <MoreDetails forecast={forecast} onlyFiveDay />
                  </View>
                ) : null
              }
            />

            {/* 🔍 SEARCH OVERLAY */}
            {showSearch && (
              <View
                style={{
                  position: "absolute",
                  bottom: 110,
                  left: 20,
                  right: 20,
                }}
              >
                <SearchBox
                  city={city}
                  setCity={setCity}
                  onPress={() => fetchWeather()}
                />
              </View>
            )}

            {/* 🔘 FLOATING ACTION BUTTONS */}
            <View
              style={{
                position: "absolute",
                bottom: 24,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              {/* 🧭 Explore */}
             <Ionicons.Button
  name="compass"
  backgroundColor="#2563eb"
  onPress={() =>
    router.push({
      pathname: "/explore",
      params: { city },
    })
  }
/>


              {/* ➕ Add */}
              <TouchableOpacity
                onPress={() => setShowSearch(v => !v)}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#2563eb",
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 10,
                }}
              >
                <Ionicons name="add" size={32} color="white" />
              </TouchableOpacity>

              {/* 📊 Details */}
              <TouchableOpacity
  onPress={() =>
    router.push({
      pathname: "/details",
      params: { city }, // ✅ PASS CITY HERE
    })
  }
  style={{
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#facc15",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  }}
>
  <Ionicons name="stats-chart" size={24} color="#1e293b" />
</TouchableOpacity>

            </View>
          </SafeAreaView>
        </AnimatedGradient>
      </View>
    </>
  );
}
