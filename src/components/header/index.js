import "./style.css";
import { Link } from "react-router-dom";
import { Messenger, Notifications, Search } from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
import NotificationMenu from "./notificationMenu";
import HomeHeader from "../../svg/home_header";
import HomeHeaderActive from "../../svg/home_header_active";
import Group from "../../svg/group";
import GroupActive from "../../svg/groupActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessMenu from "./messMenu";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TelegramIcon from "@mui/icons-material/Telegram";
import AssistantIcon from "@mui/icons-material/Assistant";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import Groups3Icon from "@mui/icons-material/Groups3";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BookIcon from '@mui/icons-material/Book';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AnimatedIcon from "./AnimatedIcon"; // Thêm import AnimatedIcon
import AnimatedBell from "./AnimatedBell";
import LetterAnimation from './LetterAnimation';


export default function Header({
  page,
  getAllPosts,
  notifications,
  getNotifications,
  idUser,
  listMess,
  onlineUsers,
  socket,
  openChatWindow,
  setOpenChatWindows,
}) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#4e8bc8";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showMessMenu, setShowMessMenu] = useState(false);
  let numNotification = 0;
  const unreadNotifications = [];
  notifications?.forEach((notification) => {
    if (!notification.read) {
      unreadNotifications.push(notification);
    }
  });
  numNotification = unreadNotifications.length;
  const iconStyle = {
    color: "#4e8bc8",
    fontSize: "32px",
    transition: "transform 0.2s",
    marginRight: "12px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  };
  const allmenu = useRef(null);
  const messmenu = useRef(null);
  const usermenu = useRef(null);
  const notificationmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  useClickOutside(notificationmenu, () => {
    setShowNotificationMenu(false);
  });
  useClickOutside(messmenu, () => {
    setShowMessMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <LogoDevIcon style={{ fontSize: 55, color: color }} />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <SearchIcon color={color} />
          <input type="text" placeholder="Search" className="hide_input" />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? (
            <HomeWorkIcon style={iconStyle} />
          ) : (
            <HomeWorkOutlinedIcon style={iconStyle} />
          )}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? (
            <PeopleIcon style={iconStyle} />
          ) : (
            <PeopleOutlinedIcon style={iconStyle} />
          )}
        </Link>
        <Link
          to="/groups"
          className={`middle_icon ${page === "groups" ? "active" : "hover1"}`}
        >
          {page === "groups" ? (
            <Groups3Icon style={iconStyle} />
          ) : (
            <GroupsOutlinedIcon style={iconStyle} />
          )}
        </Link>
        <Link
          to="/saved"
          className={`middle_icon ${page === "saved" ? "active" : "hover1"}`}
        >
          {page === "saved" ? (
            <BookIcon style={iconStyle} />
          ) : (
            <BookOutlinedIcon style={iconStyle} />
          )}
        </Link>

        
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" && idUser === user.id ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name} {user?.last_name}</span>
        </Link>

        {page !== "messages" && (
          <>
            {" "}
            <div
              className={`circle_icon hover1 ${
                showMessMenu && "active_header"
              }`}
              ref={messmenu}
            >
              <div
                onClick={() => {
                  setShowMessMenu((prev) => !prev);
                }}
              >
                <div style={{ transform: "translateY(2px)" }}>
                  <LetterAnimation />
                </div>
              </div>

              {listMess.numNotifi > 0 && (
                <div className="right_notification">{listMess.numNotifi}</div>
              )}

              {showMessMenu && (
                <MessMenu
                  notifications={notifications}
                  id={user.id}
                  token={user.token}
                  getNotifications={getNotifications}
                  listMess={listMess}
                  onlineUsers={onlineUsers}
                  socket={socket}
                  setShowMessMenu={setShowMessMenu}
                  openChatWindow={openChatWindow}
                />
              )}
            </div>
          </>
        )}

        <div
          className={`circle_icon hover1 ${
            showNotificationMenu && "active_header"
          }`}
          ref={notificationmenu}
        >
          <AnimatedBell
            showNotificationMenu={showNotificationMenu}
            onClick={() => setShowNotificationMenu((prev) => !prev)}
          />
          {unreadNotifications.length > 0 && (
            <div className="right_notification">{numNotification}</div>
          )}
          {showNotificationMenu && (
            <NotificationMenu
              notifications={notifications}
              id={user.id}
              token={user.token}
              getNotifications={getNotifications}
            />
          )}
        </div>

        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <AnimatedIcon />{" "}
          </div>

          {showUserMenu && (
            <UserMenu user={user} setOpenChatWindows={setOpenChatWindows} />
          )}
        </div>
      </div>
    </header>
  );
}
