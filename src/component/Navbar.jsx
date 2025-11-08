import { useEffect, useState } from "react";
import { Description } from "./Description";
import { getFormattedData } from "./weatherService";
import { Loader } from "./Loader";
import "../App.css";

export const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Bhopal");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState("linear-gradient(to top, #0f2122ff, #0c3f85ff)");
  const [suggestions, setSuggestions] = useState([]); // for dropdown
  const [inputValue, setInputValue] = useState("");   // track current text

  // Dynamic background based on weather type
  const getBackground = (main) => {
    switch (main) {
      case "Clear":
        return "linear-gradient(to top, #7850c0ff, #083177ff)";
      case "Clouds":
        return "linear-gradient(to top, #215475ff, #406181ff)";
      case "Rain":
         return "linear-gradient(to top, #c6dcebff, #0661c9ff)";
      case "Drizzle":
        return "linear-gradient(to top, #4e54c8, #178862ff)";
      case "Thunderstorm":
        return "linear-gradient(to top, #212733ff, #243B55)";
      case "Snow":
        return "linear-gradient(to top, #919599ff, #5b51e6ff)";
      default:
        return "linear-gradient(to top, #023135ff, #281a50ff)";
    }
  };

  // Fetch weather whenever city or unit changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getFormattedData(city, units);
        setWeather(data);
        setBg(getBackground(data.main));
      } catch (err) {
        alert("City not found!");
        setWeather(null);
        setCity("Bhopal");
          setInputValue("");  // fallback
        setBg("linear-gradient(to top, #89f7fe, #66a6ff)");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, units]);

  // Toggle °C / °F
  const handleClick = (e) => {
    const currentUnit = e.currentTarget.innerText.trim().slice(1);
    const isCelsius = currentUnit === "C";
    e.currentTarget.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  // Handle Enter key press
  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      setCity(e.currentTarget.value);
      setSuggestions([]);
      e.currentTarget.blur();
    }
  };

  // Handle typing and static suggestion filtering
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const cities = [
      "London", "Gwalior", "Lucknow", "Ludhiana", "Gujrat",
      "Nagpur", "Goa", "Kerala", "Bhopal", "Mumbai", "Delhi",
      "Indore", "Kolkata", "Paris", "Tokyo", "Rajasthan", "Jaipur",
      "Chennai", "New York","America","Mumbai", "Manipur","Hoshangabad","Ujjain","Sagar","Uttar Pradesh","Ujjain","Haryana","Punjab"
    ];

    const filtered = cities.filter((c) =>
      c.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Show loader
  if (loading) return <Loader />;

  return (
    <div
      className="app"
      style={{ background: bg, transition: "background 0.8s ease-in-out" }}
    >
      <div className="overlay">
        {weather && (
          <div className="container">


            {/* Input Section */}
            
            <div className="section section_inputs" style={{ position: "relative" }}>
              <div style={{ width: "60%", position: "relative" }}>
                <input
                className="inputs"
                  type="text"
                  value={inputValue}
                  placeholder="Enter City..."
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPressed}
                />
                {/* Suggestion Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="suggestions">
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setCity(item);
                          setInputValue(item);
                          setSuggestions([]);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={handleClick}>° F</button>
            </div>

            {/* Weather Display */}
            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{Math.round(weather.temp)}°{units==="metric"?"C":"F"}</h1>
              </div>
            </div>

            {/* Description Cards */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};