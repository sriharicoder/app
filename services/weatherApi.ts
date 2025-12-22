const API_KEY = "1440eccec0bca293721dee50599c3dd3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

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
