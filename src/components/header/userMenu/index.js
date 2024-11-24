import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UserMenu({ user, setOpenChatWindows }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [themeVisible, setThemeVisible] = useState(false);
  const { darkTheme } = useSelector((state) => ({ ...state }));

  const logout = () => {
    Cookies.set("user", "");
    setOpenChatWindows([]);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  const toggleThemeMenu = () => {
    setThemeVisible((prev) => !prev);
  };

  return (
    <div
      className="mmenu"
      style={{
        top: "51px",
        right: "-10px",
        boxShadow: "0 1px 1px #fff",
        transition:"all 0.5s ease-in-out"
      }}
    >
      <div>
        {/* Theme toggle button */}
        <div
          className="mmenu_item hover3"
          onClick={toggleThemeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Theme</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              
            }}
          >
            {themeVisible ? (
              <ExpandMoreIcon sx={{ cursor: "pointer", color: "#fff" }} />
            ) : (
              <DragHandleIcon sx={{ cursor: "pointer", color: "#fff" }} />
            )}
          </div>
        </div>

        {/* Theme menu */}
        {themeVisible && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              gap: "10px",
              transition:"all 0.5s ease-in-out"
            }}
          >
            <label
              htmlFor="darkOff"
              className="hover1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                cursor: "pointer",
                marginLeft: "15px",
                marginRight: "12px",
              }}
              onClick={() => {
                Cookies.set("darkTheme", false);
                dispatch({ type: "LIGHT" });
              }}
            >
              <WbSunnyIcon />
              <span>Light Mode</span>
              {darkTheme ? (
                <input type="radio" name="dark" id="darkOff" />
              ) : (
                <input type="radio" name="dark" id="darkOff" checked />
              )}
            </label>
            <label
              htmlFor="darkOn"
              className="hover1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                cursor: "pointer",
                marginLeft: "15px",
                marginRight: "12px",
              }}
              onClick={() => {
                Cookies.set("darkTheme", true);
                dispatch({ type: "DARK" });
              }}
            >
              <DarkModeIcon />
              <span>Dark Mode</span>
              {darkTheme ? (
                <input type="radio" name="dark" id="darkOn" checked />
              ) : (
                <input type="radio" name="dark" id="darkOn" />
              )}
            </label>
          </div>
        )}

        {/* Logout button */}
        <div
          className="mmenu_item hover3"
          onClick={logout}
          style={{
            marginTop: "10px",
          }}
        >
          <div className="small_circle">
            <i className="logout_filled_icon"></i>
          </div>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
