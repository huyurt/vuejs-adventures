import api from "@/api/api-v2-config";

export async function getWeatherForecastV2Axios(city: string) {
    return await api.post(`WeatherForecast/?city=${city}`);
}