// services/locationService.ts
import * as Location from "expo-location";

/**
 * Get current city using GPS
 * - Uses last known location first (FAST)
 * - Falls back to live GPS
 * - No manual timeout (Expo handles it internally)
 */
export async function getCurrentCity(): Promise<string | null> {
  try {
    /* 1️⃣ Ask permission */
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
      return null;
    }

    /* 2️⃣ Try last known location (instant if available) */
    let location = await Location.getLastKnownPositionAsync();

    /* 3️⃣ If not available, get current location */
    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    }

    if (!location) return null;

    /* 4️⃣ Reverse geocode to city */
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (!address || address.length === 0) return null;

    const place = address[0];

    /* 5️⃣ Return best available name */
    return (
      place.city ||
      place.subregion ||
      place.region ||
      null
    );
  } catch (err) {
    console.log("Location error:", err);
    return null;
  }
}
