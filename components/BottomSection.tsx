import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/* ---------------- MAIN ---------------- */

export default function BottomSection() {
  return (
    <View style={{ marginTop: 12 }}>
      <FiveDayForecast />
      <HourlyForecast />
      <StatsGrid />
    </View>
  );
}

/* ---------------- 5 DAY FORECAST ---------------- */

export function FiveDayForecast({
  showDetailsLink = false,
}: {
  showDetailsLink?: boolean;
}) {
  const data = [
    { day: "Today", min: 20, max: 30, icon: "partly-sunny" },
    { day: "Tomorrow", min: 19, max: 29, icon: "cloud" },
    { day: "Sat", min: 19, max: 29, icon: "rainy" },
  ];

  return (
    <Animated.View entering={FadeInUp.duration(500)} style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardTitle}>5-day forecast</Text>

        {/* ✅ SHOW ONLY ON INDEX */}
        {showDetailsLink && (
          <Text
            style={styles.linkText}
            onPress={() => router.push("/details")}
          >
            More details ›
          </Text>
        )}
      </View>

      {data.map((item) => (
        <View key={item.day} style={styles.forecastRow}>
          <Text style={styles.day}>{item.day}</Text>

          <Ionicons
            name={item.icon as any}
            size={18}
            color="#facc15"
            style={{ marginHorizontal: 6 }}
          />

          <Text style={styles.temp}>{item.min}°</Text>

          <View style={styles.rangeBar}>
            <View style={styles.rangeFill} />
          </View>

          <Text style={styles.temp}>{item.max}°</Text>
        </View>
      ))}
    </Animated.View>
  );
}

/* ---------------- HOURLY FORECAST ---------------- */

function HourlyForecast() {
  const hours = ["Now", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const temps = [29, 28, 27, 25, 24, 23];

  return (
    <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
      <Text style={styles.cardTitle}>24-hour forecast</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hours.map((hour, i) => (
          <View key={hour} style={styles.hourItem}>
            <Ionicons name="cloud-outline" size={18} color="#64748b" />
            <Text style={styles.hourTemp}>{temps[i]}°</Text>
            <Text style={styles.hour}>{hour}</Text>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

/* ---------------- STATS GRID ---------------- */

function StatsGrid() {
  return (
    <View style={styles.grid}>
      <StatCard icon="sunny" title="UV" value="Weak" sub="1" />
      <StatCard icon="water" title="Humidity" value="49%" />
      <StatCard icon="thermometer" title="Real feel" value="29°" />
      <StatCard icon="navigate" title="Wind" value="10.5 km/h" />
    </View>
  );
}

type StatCardProps = {
  icon: string;
  title: string;
  value: string;
  sub?: string;
};

function StatCard({ icon, title, value, sub }: StatCardProps) {
  const pulse = useSharedValue(1);

  pulse.value = withRepeat(
    withTiming(1.05, { duration: 1200 }),
    -1,
    true
  );

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <Animated.View entering={FadeInUp} style={[styles.statCard, style]}>
      <Ionicons name={icon as any} size={20} color="#2563eb" />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {sub && <Text style={styles.statSub}>{sub}</Text>}
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

  linkText: {
    fontSize: 13,
    color: "#64748b",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forecastRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  day: { flex: 1, fontSize: 14 },
  temp: { width: 28, textAlign: "center" },

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
    alignItems: "flex-start",
  },

  statTitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  statSub: {
    fontSize: 12,
    color: "#64748b",
  },
});
