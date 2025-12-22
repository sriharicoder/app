import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // ✅ Valid for Stack (native-stack)
        animation: "slide_from_right",

        // Optional polish
        contentStyle: { backgroundColor: "black" },
      }}
    />
  );
}
