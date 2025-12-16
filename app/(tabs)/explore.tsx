import { Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-indigo-100 px-6">
      <Text className="text-3xl font-bold text-indigo-700 mb-3">
        🌍 Explore Weather
      </Text>
      <Text className="text-center text-gray-700 text-lg">
        This app provides simple and quick weather information.
      </Text>
    </View>
  );
}
