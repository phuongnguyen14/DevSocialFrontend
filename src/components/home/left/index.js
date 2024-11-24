// import LeftLink from "./LeftLink";
// import "./style.css";
// import { left } from "../../../data/home";
// import { Link } from "react-router-dom";
// import { ArrowDown1 } from "../../../svg";
// import { useState , useMemo } from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import ShortTextIcon from '@mui/icons-material/ShortText';
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import Shortcut from "./Shortcut";


// // Hàm để loại bỏ dấu và chuyển sang chữ thường
// function removeVietnameseTones(str) {
//   return str
//     .normalize("NFD") // Phân tách các dấu tiếng Việt
//     .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
//     .toLowerCase(); // Chuyển thành chữ thường
// }

// const purpleColor ='rgba(135, 206, 235, 0.8)';

// export default function LeftHome({ user }) {
//   const fullNameWithoutAccent = useMemo(() => {
//     if (user?.first_name && user?.last_name) {
//       return `${removeVietnameseTones(user.first_name)}${removeVietnameseTones(user.last_name)}`;
//     }
//     return "";
//   }, [user?.first_name, user?.last_name]);
  
//   return (
//     <div className="left_home scrollbar">
//       <div className="left_top">
//       <Link to="/profile" className="left_link hover2">
//         <img src={user?.picture} alt="" />
//         <span>
//           {user?.first_name} {user.last_name}
//         </span>
//         <br/>
          
//       </Link>

//       {left.slice(0, 8).map((link, i) => (
//         <LeftLink
//           key={i}
//           icon={link.icon}
//           text={link.text}
//           notification={link.notification}
//           to={link.to}
//         />
//       ))}
//       </div>
//       <div className="left_bot">
//       <br/>
//       <div className="shortcut_list">
//         <div className="shortcut_title">
//         <ShortTextIcon/>
//         <h3 >Shortcut</h3>
//         </div>
//         <Shortcut
//           link="https://www.youtube.com"
//           icon={<YouTubeIcon className="shortcut_icon" />}
//           name="Youtube channel"
//         />
//         <Shortcut
//           link="https://www.instagram.com/"
//           icon={<InstagramIcon className="shortcut_icon" />}
//           name="Instagram"
//         />
//         <Shortcut
//           link="https://www.linkedin.com/"
//           icon={<LinkedInIcon className="shortcut_icon" />}
//           name="LinkedIn"
//         />
//         <Shortcut
//           link="https://github.com/phuongnguyen14"
//           icon={<GitHubIcon className="shortcut_icon" />}
//           name="Github"
//         />
//       </div>
//       </div>
      
//       <div className="footer">
//         @{fullNameWithoutAccent} {/* Hiển thị full name đã chuyển thành chữ thường không dấu */}
//       </div>
//     </div>
//   );
// }
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { People as PeopleIcon, Bookmark as BookmarkIcon, Groups as GroupsIcon, Cloud as CloudIcon, Email as EmailIcon } from '@mui/icons-material';
import InstagramIcon from "@mui/icons-material/Instagram";
import ShortTextIcon from '@mui/icons-material/ShortText';
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LeftLink from "./LeftLink"; // Make sure you import LeftLink from the correct file
import Shortcut from "./Shortcut";
import "./style.css";

// Hàm để loại bỏ dấu và chuyển sang chữ thường
function removeVietnameseTones(str) {
  return str
    .normalize("NFD") // Phân tách các dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .toLowerCase(); // Chuyển thành chữ thường
}

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

export default function LeftHome({ user }) {
  const fullNameWithoutAccent = useMemo(() => {
    if (user?.first_name && user?.last_name) {
      return `${removeVietnameseTones(user.first_name)}${removeVietnameseTones(user.last_name)}`;
    }
    return "";
  }, [user?.first_name, user?.last_name]);

  return (
    <div className="left_home scrollbar">
      <div className="left_top">
        <Link to="/profile" className="left_link hover2">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name} {user?.last_name}</span>
          <br />
        </Link>

        {left.slice(0, 8).map((link, i) => (
          <LeftLink
            key={i}
            icon={link.icon}
            text={link.text}
            notification={link.notification}
            to={link.to}
          />
        ))}
      </div>

      <div className="left_bot">
        <br />
        <div className="shortcut_list">
          <div className="shortcut_title">
            <ShortTextIcon />
            <h3>Shortcut</h3>
          </div>
          <Shortcut
            link="https://www.youtube.com"
            icon={<YouTubeIcon className="shortcut_icon" />}
            name="Youtube channel"
          />
          <Shortcut
            link="https://www.instagram.com/"
            icon={<InstagramIcon className="shortcut_icon" />}
            name="Instagram"
          />
          <Shortcut
            link="https://www.linkedin.com/"
            icon={<LinkedInIcon className="shortcut_icon" />}
            name="LinkedIn"
          />
          <Shortcut
            link="https://github.com/phuongnguyen14"
            icon={<GitHubIcon className="shortcut_icon" />}
            name="Github"
          />
        </div>
      </div>

      <div className="footer">
        @{fullNameWithoutAccent} {/* Hiển thị full name đã chuyển thành chữ thường không dấu */}
      </div>
    </div>
  );
}

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
