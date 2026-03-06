import { useState, useEffect } from "react";

function WeatherApp() {
  const [data, setData] = useState([]);

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m&timezone=auto";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.daily) {
          const dailyData = json.daily.time.map((date, i) => ({
            Date: date,
            tempMax: json.daily.temperature_2m_max[i],
            tempMin: json.daily.temperature_2m_min[i],
            sunRise: json.daily.sunrise[i],
            sunSet: json.daily.sunset[i],
          }));
          setData(dailyData);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-lg mb-2">
          🌤 Weather Planner
        </h1>
        <p className="text-lg text-blue-700">{data.length} Days Forecast</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-800">{day.Date}</h3>
              <span className="text-sm text-gray-500">🌞</span>
            </div>

            <div className="mb-4 space-y-1">
              <p className="text-gray-700 font-medium">🌡 Max: {day.tempMax}°C</p>
              <p className="text-gray-600">🌡 Min: {day.tempMin}°C</p>
              <p className="text-yellow-600">🌅 Sunrise: {day.sunRise}</p>
              <p className="text-orange-600">🌇 Sunset: {day.sunSet}</p>
            </div>

            <input
              type="text"
              placeholder="Add your note..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />

            <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-2xl hover:bg-blue-700 transition duration-300">
              Save Note
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherApp;