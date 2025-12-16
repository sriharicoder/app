import { Text, View } from "react-native";

type Props = {
  city: string;
};

export default function WeatherCard({ city }: Props) {
  return (
    <View className="mt-6 bg-white rounded-3xl p-6 shadow-lg">
      <Text className="text-xl font-bold text-center text-gray-800">
        {city}
      </Text>

      <Text className="text-6xl font-extrabold text-center text-sky-600 my-4">
        30°C
      </Text>

      <Text className="text-center text-lg text-yellow-500 mb-4">
        ☀ Sunny
      </Text>

      <View className="flex-row justify-between px-4">
        <View className="items-center">
          <Text className="text-gray-500">Humidity</Text>
          <Text className="font-bold text-gray-700">65%</Text>
        </View>

        <View className="items-center">
          <Text className="text-gray-500">Wind</Text>
          <Text className="font-bold text-gray-700">6 m/s</Text>
        </View>
      </View>
    </View>
  );
}
