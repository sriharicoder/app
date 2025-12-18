import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

import AnimatedGradient from "../../components/animations/AnimatedGradient";
import WeatherAnimation from "../../components/animations/WeatherAnimation";
import BottomSection from "../../components/BottomSection";

export default function DetailsScreen() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  return (
    <>
      {/* Hide header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1 }}>
        <AnimatedGradient isNight={isNight}>
          {/* Background animation */}
          <View style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <WeatherAnimation weather="storm" isNight={isNight} />
          </View>

          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 24,
                paddingBottom: 40,
                paddingHorizontal: 14,
              }}
            >
              {/* Title */}
              <Animated.Text
                entering={FadeInUp.duration(500)}
                style={{
                  fontSize: 26,
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                📊 Weather Details
              </Animated.Text>

              {/* Animated sections */}
              <Animated.View entering={FadeInUp.delay(100)}>
                <BottomSection />
              </Animated.View>
            </ScrollView>
          </SafeAreaView>
        </AnimatedGradient>
      </View>
    </>
  );
}
