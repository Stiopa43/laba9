import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import getDataFromGoogleApp from "../database/Utils";

const TrafficLightContext = createContext();

const googleUrl = import.meta.env.VITE_apiURL;
//const googleUrl = "https://script.google.com/macros/s/AKfycbz2Cu0AfLNCoH_mbyMGkY-FNjwmuWN5PiZLH2DSYLqVQomWIqlH0h6E24KsEpZCflhP/exec";

export const TrafficLightsProvider = ({ children, id=1 }) => {
  const [activeColor, setActiveColor] = useState("gray");
  const [count, setCount] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const [blinkingColor, setBlinkingColor] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [trafficLightData, setTrafficLightData] = useState(null);

  const config = {
    red: {
      duration: 4000,
      backgroundColor: "red",
      next: "green",
    },
    yellow: {
      duration: 500,
      backgroundColor: "yellow",
      next: "red",
    },
    green: {
      duration: 3000,
      backgroundColor: "green",
      next: "yellow",
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/trafficLight");
      setTrafficLightData(response.data.trafficLight);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      await axios.put("http://localhost:3000/trafficLight", {
        trafficLight: {
          activeColor,
          count,
          blinkingColor,
          isBlinking,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLightClick = (color) => {
    if (activeColor !== color) {
      setActiveColor(color);
      if (blinkingColor !== color) {
        setIsBlinking(true);
        setBlinkingColor(color);
      } else {
        setTimeout(() => {
          setIsBlinking(false);
          setBlinkingColor(null);
        }, 500);
      }
    }
    setCount((prevCount) => ({
      ...prevCount,
      [color]: prevCount[color] + 1,
    }));
    updateData();

    ShowState(color);
    
    //console.log(color);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (trafficLightData) {
      setActiveColor(trafficLightData.activeColor);
      setCount(trafficLightData.count);
      setBlinkingColor(trafficLightData.blinkingColor);
      setIsBlinking(trafficLightData.isBlinking);
    }
  }, [trafficLightData]);

  const ShowState = async (color) => {
    const oldState = await GetState();
    console.log("Old State: " + oldState);
  
    await SetState(color);
    await SetState(color);
    //console.log("|"+color);
  
    const newState = await GetState();
    console.log("New State: " + newState);
  
    const trafficLights = await GetTrafficLighs();
    console.log("Traffic Lights: ", trafficLights);
  }

  const SetState = async (color) =>{
    let status;
    if(color === "red" || color === "yellow" || color === "green")
    {
      status = color;
    }
    else status = gray;

    try {
      getDataFromGoogleApp(`${googleUrl}?method=SetState&trafficLightId=${id}&color=${color}`);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

  const GetState = async () => {
    try {
      const data = await getDataFromGoogleApp(`${googleUrl}?method=GetState&trafficLightId=${id}`);
      //console.log(data.color);
      return data.color;
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

  const GetTrafficLighs = async () => {
    try {
      const data = await getDataFromGoogleApp(`${googleUrl}?method=GetTrafficLighs`);
      return data;
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

  const value = {
    config,
    activeColor,
    setActiveColor,
    count,
    setCount,
    blinkingColor,
    setBlinkingColor,
    isBlinking,
    setIsBlinking,
    handleLightClick,
  };

  return (
    <TrafficLightContext.Provider value={{ ...value }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrafficLightContext;
