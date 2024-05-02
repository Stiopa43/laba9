import { useContext } from "react";
import Light from "./Light";
import TrafficLightContext from "../context/TrafficLightContext";

const TrafficLight = () => {
  const { config, count, blinkingColor, isBlinking, handleLightClick } =
    useContext(TrafficLightContext);

  return (
    <div className="traffic-light-container">
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          color={color}
          onClick={() => handleLightClick(color)}
          count={count[color]}
          isBlinking={isBlinking && blinkingColor === color}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
