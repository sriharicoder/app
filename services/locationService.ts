// services/locationService.ts
import * as Location from "expo-location";

export async function getCurrentCity(): Promise<string | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return null;

    // ⏱ Manual timeout wrapper
    const locationPromise = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error("Location timeout")), 8000)
    );

    const location = (await Promise.race([
      locationPromise,
      timeoutPromise,
    ])) as Location.LocationObject;

    if (!location) return null;

    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (!address.length) return null;

    // ✅ Return ONLY city / district
    return (
      address[0].city ||
      address[0].subregion ||
      address[0].region ||
      null
    );
  } catch (err) {
    console.log("Location error:", err);
    return null;
  }
}
