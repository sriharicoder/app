import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import AnimatedGradient from "../components/animations/AnimatedGradient";
import WeatherAnimation from "../components/animations/WeatherAnimation";
import MoreDetails from "../components/MoreDetails";

import { getCurrentCity } from "../services/locationService";
import { getFiveDayForecast } from "../services/weatherApi";

export default function DetailsScreen() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH FORECAST ---------------- */

  useEffect(() => {
    (async () => {
      try {
        const city = await getCurrentCity();
        if (!city) return;

        const data = await getFiveDayForecast(city);
        setForecast(data);
      } catch (e) {
        console.log("Forecast error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          <View style={{ position: "absolute", inset: 0 }}>
            <WeatherAnimation weather="cloudy" isNight={isNight} />
          </View>

          <SafeAreaView style={{ flex: 1, padding: 14 }}>
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
              forecast && <MoreDetails forecast={forecast} mode="full" />

            )}
          </SafeAreaView>
        </AnimatedGradient>
      </View>
    </>
  );
}
