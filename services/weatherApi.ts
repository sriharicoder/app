const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY!;
const BASE_URL = process.env.EXPO_PUBLIC_WEATHER_BASE_URL!;

export async function getCurrentWeather(city: string) {
  const query = encodeURIComponent(city);

  const res = await fetch(
    `${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function getFiveDayForecast(city: string) {
  const query = encodeURIComponent(city);

  const res = await fetch(
    `${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error("Forecast error");
  return res.json();
}
