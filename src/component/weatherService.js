
const API_KEY = "eb457e76608503d92c9129d8090e4c62";

const getFormattedData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (data.cod !== 200) throw new Error(data.message || "City not found");

    const { weather, main, wind, sys, name } = data;
    const { description, icon } = weather[0] || {};

    return {
      description,
      main: weather[0]?.main ?? "Clear",
      iconURL: icon
        ? `https://openweathermap.org/img/wn/${icon}@2x.png`
        : "",
      temp: main?.temp ?? 0,
      feels_like: main?.feels_like ?? 0,
      temp_min: main?.temp_min ?? 0,
      temp_max: main?.temp_max ?? 0,
      pressure: main?.pressure ?? 0,
      humidity: main?.humidity ?? 0,
      speed: wind?.speed ?? 0,
      country: sys?.country ?? "",
      name: name ?? "",
    };
  } catch (err) {
    throw err;
  }
};

export { getFormattedData };

