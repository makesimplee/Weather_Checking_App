import { FaArrowDown, FaArrowUp, FaCompress } from "react-icons/fa";
import { MdWaves } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { BiHappy } from "react-icons/bi";
import "./Description.css";

export const Description = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather?.temp_min?.toFixed() ?? "-",
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather?.temp_max?.toFixed() ?? "-",
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather?.feels_like?.toFixed() ?? "-",
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <FaCompress />,
      title: "pressure",
      data: weather?.pressure ?? "-",
      unit: "hPa",
    },
    {
      id: 5,
      icon: <WiHumidity />,
      title: "humidity",
      data: weather?.humidity ?? "-",
      unit: "%",
    },
    {
      id: 6,
      icon: <MdWaves />,
      title: "wind speed",
      data: weather?.speed?.toFixed() ?? "-",
      unit: windUnit,
    },
  ];

  return (
    <div className="section section_description">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="description_icon">
            {icon}
            <small>{title}</small>
          </div>
          <h3>{`${data} ${unit}`}</h3>
        </div>
      ))}
    </div>
  );
};;