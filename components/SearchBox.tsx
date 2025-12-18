import { View, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { LOCATIONS } from "./data/locations";

type Props = {
  city: string;
  setCity: (v: string) => void;
  onPress: () => void;
};

export default function SearchBox({ city, setCity, onPress }: Props) {
  const suggestions = useMemo(() => {
    if (!city.trim()) return [];

    return LOCATIONS.filter(item =>
      item.district.toLowerCase().includes(city.toLowerCase())
    );
  }, [city]);

  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
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

      {/* 🔽 SUGGESTIONS */}
      {suggestions.length > 0 && (
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#ffffff",
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
                onPress={() =>
                  setCity(
                    `${item.district}, ${item.state}, ${item.country}`
                  )
                }
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e5e7eb",
                }}
              >
                <Text style={{ fontSize: 15, color: "#0f172a" }}>
                  {item.district}
                </Text>
                <Text style={{ fontSize: 12, color: "#64748b" }}>
                  {item.state}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* BUTTON */}
      <TouchableOpacity
        onPress={onPress}
        disabled={!city.trim()}
        style={{
          marginTop: 14,
          backgroundColor: city.trim()
            ? "#2563eb"
            : "#94a3b8",
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
