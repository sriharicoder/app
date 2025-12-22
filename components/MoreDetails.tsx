import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

/* ---------------- TYPES ---------------- */

type Props = {
  forecast: any;
  mode?: "preview" | "full"; // 👈 important
};

/* ---------------- MAIN ---------------- */

export default function MoreDetails({ forecast, mode = "full" }: Props) {
  if (!forecast) return null;

  return (
    <View style={{ marginTop: 12 }}>
      <FiveDayForecast forecast={forecast} />

      {/* ❌ Hide below sections on index */}
      {mode === "full" && (
        <>
          <HourlyForecast forecast={forecast} />
          <StatsGrid forecast={forecast} />
        </>
      )}
    </View>
  );
}

/* ---------------- 5 DAY FORECAST ---------------- */

function FiveDayForecast({ forecast }: { forecast: any }) {
  const daily = forecast.list.filter((item: any) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <Animated.View entering={FadeInUp.duration(400)} style={styles.card}>
      <Text style={styles.cardTitle}>5-day forecast</Text>

      {daily.map((item: any, i: number) => (
        <View key={i} style={styles.forecastRow}>
          <Text style={styles.day}>
            {new Date(item.dt * 1000).toLocaleDateString("en", {
              weekday: "short",
            })}
          </Text>

          <Ionicons name="cloud-outline" size={18} color="#facc15" />

          <Text style={styles.temp}>
            {Math.round(item.main.temp_min)}°
          </Text>

          <View style={styles.rangeBar}>
            <View style={styles.rangeFill} />
          </View>

          <Text style={styles.temp}>
            {Math.round(item.main.temp_max)}°
          </Text>
        </View>
      ))}
    </Animated.View>
  );
}

/* ---------------- HOURLY ---------------- */

function HourlyForecast({ forecast }: { forecast: any }) {
  const hourly = forecast.list.slice(0, 8);

  return (
    <Animated.View entering={FadeInUp.delay(80)} style={styles.card}>
      <Text style={styles.cardTitle}>24-hour forecast</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourly.map((item: any, i: number) => (
          <View key={i} style={styles.hourItem}>
            <Ionicons name="cloud-outline" size={18} color="#64748b" />
            <Text style={styles.hourTemp}>
              {Math.round(item.main.temp)}°
            </Text>
            <Text style={styles.hour}>
              {new Date(item.dt * 1000).getHours()}:00
            </Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

/* ---------------- STATS ---------------- */

function StatsGrid({ forecast }: { forecast: any }) {
  const now = forecast.list[0];

  return (
    <View style={styles.grid}>
      <Stat icon="water" title="Humidity" value={`${now.main.humidity}%`} />
      <Stat icon="navigate" title="Wind" value={`${now.wind.speed} km/h`} />
      <Stat icon="thermometer" title="Pressure" value={`${now.main.pressure} hPa`} />
      <Stat icon="sunny" title="Clouds" value={`${now.clouds.all}%`} />
    </View>
  );
}

function Stat({ icon, title, value }: any) {
  return (
    <Animated.View entering={FadeInUp} style={styles.statCard}>
      <Ionicons name={icon} size={20} color="#2563eb" />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </Animated.View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  forecastRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  day: { flex: 1, fontSize: 14 },
  temp: { width: 30, textAlign: "center" },
  rangeBar: {
    flex: 2,
    height: 5,
    backgroundColor: "#e5e7eb",
    borderRadius: 5,
    marginHorizontal: 6,
  },
  rangeFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#facc15",
    borderRadius: 5,
  },
  hourItem: {
    alignItems: "center",
    marginRight: 16,
  },
  hourTemp: { fontWeight: "600" },
  hour: { fontSize: 11, color: "#64748b" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  statTitle: { fontSize: 12, color: "#64748b" },
  statValue: { fontSize: 18, fontWeight: "700" },
});
