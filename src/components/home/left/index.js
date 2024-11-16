import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShortTextIcon from '@mui/icons-material/ShortText';
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Shortcut from "./Shortcut";

const purpleColor ='rgba(135, 206, 235, 0.8)';

export default function LeftHome({ user }) {
  return (
    <div className="left_home scrollbar">
      <div className="left_top">
      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
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
      <br/>
      <div className="shortcut_list">
        <div className="shortcut_title">
        <ShortTextIcon/>
        <h3 >Shortcut</h3>
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
      
      <div className={`footer `}>
      @{user?.last_name} 
      </div>
    </div>
  );
}
