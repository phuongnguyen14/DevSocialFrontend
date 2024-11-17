import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
export default function UserMenu({ user, setOpenChatWindows }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const logout = () => {
    Cookies.set("user", "");
    setOpenChatWindows([]);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="mmenu" style={{
      top: "51px",
      right: "-10px",
      boxShadow: "0 1px 1px #fff", // Thay đổi border thành box-shadow
    }}>
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name}
                 {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          
          
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Theme</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 3 && <Theme setVisible={setVisible} />}
    </div>
  );
}
