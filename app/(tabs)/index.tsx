import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import WeatherCard from "../../components/WeatherCard";

export default function HomeScreen() {
  const [city, setCity] = useState("");

  return (
    <View className="flex-1 bg-sky-100 px-5 pt-6">
      {/* Title */}
      <Text className="text-3xl font-extrabold text-sky-700 text-center mb-6">
        🌤 Smart Weather App
      </Text>

      {/* Input */}
      <View className="bg-white rounded-2xl p-4 shadow-md">
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        <TouchableOpacity className="bg-sky-600 py-3 rounded-xl">
          <Text className="text-white text-center font-semibold text-lg">
            Check Weather
          </Text>
        </TouchableOpacity>
      </View>

      {/* Weather Card */}
      <WeatherCard city={city || "City Name"} />
    </View>
  );
}
