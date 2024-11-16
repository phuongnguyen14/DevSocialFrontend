import React, { useState } from 'react';
import {
  People as PeopleIcon,
  Telegram as TelegramIcon,
  Bookmark as BookmarkIcon,
  Groups as GroupsIcon,
  Cloud as CloudIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const iconStyle = {
  color: '#64b5f6',
  fontSize: '35px',
  marginRight: '15px',
  transition: 'transform 0.3s ease, color 0.3s ease',
};

const iconHoverStyle = {
  color: '#bbdefb',
  transform: 'scale(1.2)',
};

const IconWithHover = ({ IconComponent }) => {
  const [hover, setHover] = useState(false);

  return (
    <IconComponent
      style={hover ? { ...iconStyle, ...iconHoverStyle } : iconStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export const left = [
  {
    text: "Friends",
    icon: <IconWithHover IconComponent={PeopleIcon} />,
    to: "friends",
  },
  {
    text: "Groups",
    icon: <IconWithHover IconComponent={GroupsIcon} />,
    to: "/groups",
  },

  {
    text: "Messenger",
    icon: <IconWithHover IconComponent={EmailIcon} />,
    to: "/messages",
  },
  {
    text: "Saved",
    icon: <IconWithHover IconComponent={BookmarkIcon} />,
    to: "/saved",
  },
  {
    text: "Weather",
    icon: <IconWithHover IconComponent={CloudIcon} />,
    to: "/weather",
  },
];

