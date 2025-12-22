import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentCity } from "../services/locationService";

type Props = {
  city: string;
  setCity: (v: string) => void;
  onPress: () => void;
};

export default function SearchBox({ city, setCity, onPress }: Props) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 22,
        padding: 16,
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
          placeholder="Enter city / district"
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
        />
      </View>

      {/* SEARCH BUTTON */}
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

      {/* 📍 GPS BUTTON */}
      <TouchableOpacity
        onPress={async () => {
          const detected = await getCurrentCity();
          if (detected) {
            setCity(detected);
            onPress();
          }
        }}
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="navigate" size={18} color="#2563eb" />
        <Text style={{ color: "#2563eb", marginLeft: 6 }}>
          Use my current location
        </Text>
      </TouchableOpacity>
    </View>
  );
}
