import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./animatedBell.css";

export default function AnimatedBell({ showNotificationMenu, onClick }) {
  const [isRinging, setIsRinging] = useState(false);

  const handleClick = () => {
    onClick();
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 600); // Thời gian trùng với thời gian của animation
  };

  return (
    <div onClick={handleClick} className={`bell-icon ${isRinging ? "ring" : ""}`}>
      <NotificationsIcon />
    </div>
  );
}
