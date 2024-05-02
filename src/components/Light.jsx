import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useContext } from "react";
import TrafficLightContext from "../context/TrafficLightContext";

const Light = ({ color }) => {
  const {
    config,
    activeColor,
    count,
    handleLightClick,
    blinkingColor,
    isBlinking,
  } = useContext(TrafficLightContext);
  const bg = activeColor === color ? config[color].backgroundColor : "gray";

  return (
    <motion.div
      className="traffic-light"
      style={{
        backgroundColor: bg,
      }}
      onClick={() => handleLightClick(color)}
      animate={
        isBlinking && blinkingColor === color ? { opacity: 0 } : { opacity: 1 }
      }
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        repeat: isBlinking && blinkingColor === color ? Infinity : 0,
      }}
    >
      {count[color]}
    </motion.div>
  );
};

Light.propTypes = {
  color: PropTypes.string.isRequired,
  isBlinking: PropTypes.bool,
  blinkingColor: PropTypes.string,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Light;
