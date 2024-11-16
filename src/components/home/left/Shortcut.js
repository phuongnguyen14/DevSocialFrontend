import React, { useState } from 'react';

const iconStyle = {
  color: 'rgba(135, 206, 235, 0.8)',
  fontSize:"30px",
  marginRight:"8px",
  transition: 'transform 0.3s ease, color 0.3s ease',
};

const iconHoverStyle = {
  color: '#bbdefb',
  transform: 'scale(1.2)',
};

export default function Shortcut({ link, icon, name }) {
  const [hover, setHover] = useState(false);

  const combinedIconStyle = hover ? { ...iconStyle, ...iconHoverStyle } : iconStyle;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="shortcut_item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {React.cloneElement(icon, { style: combinedIconStyle })}
      <span>{name}</span>
    </a>
  );
}