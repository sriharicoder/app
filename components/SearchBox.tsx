import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  city: string;
  setCity: (v: string) => void;
  onPress: () => void;
};

export default function SearchBox({ city, setCity, onPress }: Props) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        borderRadius: 22,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      {/* INPUT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f1f5f9",
          borderRadius: 16,
          paddingHorizontal: 14,
        }}
      >
        <Ionicons name="location-outline" size={20} color="#64748b" />

        <TextInput
          placeholder="Enter city name"
          placeholderTextColor="#94a3b8"
          value={city}
          onChangeText={setCity}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 10,
            fontSize: 16,
            color: "#0f172a",
          }}
          returnKeyType="search"
          onSubmitEditing={onPress}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        onPress={onPress}
        disabled={!city.trim()}
        style={{
          marginTop: 14,
          backgroundColor: city.trim() ? "#2563eb" : "#94a3b8",
          paddingVertical: 14,
          borderRadius: 16,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Ionicons name="search" size={18} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 8,
          }}
        >
          Check Weather
        </Text>
      </TouchableOpacity>
    </View>
  );
}
