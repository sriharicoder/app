import { View, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { LOCATIONS } from "./data/locations";
import { getCurrentCity } from "../services/locationService";

type Props = {
  city: string;
  setCity: (v: string) => void;
  onPress: () => void;
};

export default function SearchBox({ city, setCity, onPress }: Props) {
  const suggestions = useMemo(() => {
    if (!city.trim()) return [];

    const q = city.toLowerCase();
    return LOCATIONS.filter(
      item =>
        item.district.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [city]);

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
          value={city}
          onChangeText={setCity}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 10,
            fontSize: 16,
          }}
        />
      </View>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#fff",
            borderRadius: 14,
            maxHeight: 180,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={suggestions}
            keyExtractor={(item) =>
              `${item.district}-${item.state}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCity(`${item.district}, ${item.state}, ${item.country}`);
                  onPress();
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e5e7eb",
                }}
              >
                <Text style={{ fontSize: 15 }}>{item.district}</Text>
                <Text style={{ fontSize: 12, color: "#64748b" }}>
                  {item.state}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* GPS BUTTON */}
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
