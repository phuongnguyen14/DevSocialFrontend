import React, { useState, useRef } from "react";
import { styled } from "@mui/system";
import LooksIcon from '@mui/icons-material/Looks';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import useClickOutside from "../../helpers/clickOutside"; // Import useClickOutside
import SettingsIcon from '@mui/icons-material/Settings';
const AnimatedWrapper = styled("div")(({ rotate }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  transition: "transform 0.5s ease", 
  transform: rotate ? "rotate(90deg)" : "rotate(0deg)", 
  backgroundColor: rotate ? "#e0f2ff" : "transparent", 
  color: rotate ? "#ffffff" : "#4e8bc8", 
}));

const AnimatedIcon = () => {
  const [isDropped, setIsDropped] = useState(false);
  const iconRef = useRef(null);

  const handleClick = () => setIsDropped((prev) => !prev);

  // Dùng useClickOutside để reset trạng thái khi click ra ngoài
  useClickOutside(iconRef, () => setIsDropped(false));

  return (
    <AnimatedWrapper rotate={isDropped} onClick={handleClick} ref={iconRef}>
      <SettingsIcon />
    </AnimatedWrapper>
  );
};

export default AnimatedIcon;
