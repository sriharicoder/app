import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import AnimatedGradient from "../../components/animations/AnimatedGradient";
import WeatherAnimation from "../../components/animations/WeatherAnimation";

export default function ExploreScreen() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 5;

  return (
    <View style={{ flex: 1 }}>
      {/* 🌈 Animated Background */}
      <AnimatedGradient isNight={isNight}>
        {/* 🌦 Background Animation */}
        <View
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <WeatherAnimation weather="cloudy" isNight={isNight} />
        </View>

        {/* 📦 CONTENT */}
        <View className="flex-1 px-6 pt-16">
          {/* Title */}
          <Animated.Text
            entering={FadeInUp.duration(600)}
            className="text-3xl font-bold text-white text-center mb-3"
          >
            🌍 Explore Weather
          </Animated.Text>

          {/* Subtitle */}
          <Animated.Text
            entering={FadeInUp.delay(200).duration(600)}
            className="text-center text-white/80 text-lg mb-8"
          >
            Discover how smart animations and gradients bring weather to life.
          </Animated.Text>

          {/* Feature Cards */}
          <View className="space-y-4">
            <FeatureCard
              emoji="🌈"
              title="Dynamic Gradients"
              desc="Background colors adapt automatically to day, night, and temperature."
            />
            <FeatureCard
              emoji="🌧"
              title="Live Weather Effects"
              desc="Rain, clouds, wind, and thunder animations based on conditions."
            />
            <FeatureCard
              emoji="⚡"
              title="Smooth Animations"
              desc="Optimized transitions powered by Reanimated for a premium feel."
            />
          </View>
        </View>
      </AnimatedGradient>
    </View>
  );
}

/* ---------------- FEATURE CARD ---------------- */

function FeatureCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={{
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 20,
        padding: 16,
      }}
    >
      <Text className="text-xl text-white font-semibold mb-1">
        {emoji} {title}
      </Text>
      <Text className="text-white/80 text-base">{desc}</Text>
    </Animated.View>
  );
}
