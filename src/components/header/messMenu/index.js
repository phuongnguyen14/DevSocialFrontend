import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { setRead } from "../../../functions/notification";
import { useSelector } from "react-redux";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Return, Search } from "../../../svg";
import { search } from "../../../functions/user";
import SearchMessMenu from "./SearchMessMenu";
import "./mess.css";
export default function MessMenu({
  notifications,
  id,
  token,
  getNotifications,
  listMess,
  loadingListMess,
  onlineUsers,
  socket,
  setShowChat,
  setShowChatRoom,
  setShowMessMenu,
  openChatWindow,
}) {
  const { user } = useSelector((user) => ({ ...user }));
  const reacts = ["Like", "Love", "Angry", "Haha", "Sad", "Wow"];
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const input = useRef(null);
  const menu = useRef(null);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [iconVisible, setIconVisible] = useState(true);
  console.log(listMess);
  return (
    <div
      className="mmenu_notification scrollbar"
      style={{
        top: "51px",
        right: "-154px",
        boxShadow: "0 1px 1px #fff", // Thay đổi border thành box-shadow
      }}
      
    >
      <h2 className="mess_menu_title">
        <ContactSupportIcon/>
        Chats</h2>
      <div style={{ display: "flex" }}>
        <div className="header_left">
          <div
            className="search search1"
            style={{ width: "330px",marginLeft: "-10px",}}
            onClick={() => {
              setShowSearchMenu(true);
            }}
          >
            <Search color={color} />
            <input
              type="text"
              placeholder="Search your friend"
              className="hide_input"
            />
          </div>
        </div>
        {showSearchMenu && (
          <SearchMessMenu
            color={color}
            setShowSearchMenu={setShowSearchMenu}
            token={user.token}
            listMess={listMess}
            openChatWindow={openChatWindow}
            setShowMessMenu={setShowMessMenu}
            onlineUsers={onlineUsers}
          />
        )}
      </div>

      {listMess?.rooms ? (
        listMess?.rooms?.map((mess, i) => (
          <>
            {mess?.group ? (
              <>
                <div
                  className="mmenu_item hover3"
                  style={{ cursor: "pointer" }}
                  key={i}
                  onClick={() => {
                    setShowMessMenu(false);
                    openChatWindow({
                      _id: mess?.roomId,
                      room_name: mess?.room_name,
                      group_name: mess?.fndInfo?.group_name,
                      groupRef: mess?.fndInfo,
                      icon: mess?.icon,
                      color: mess?.color,
                      media: mess?.media,
                      roomId: mess?.roomId,
                    });
                  }}
                >
                  <div className="profile_link">
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        display: "flex",
                        flexDirection: "row-reverse",
                        left: "0",
                      }}
                    >
                      <img
                        style={{
                          position: "absolute",
                          borderRadius: "10%",
                          objectFit: "cover",
                          width: "37px",
                          height: "37px",
                          left: "28px",
                        }}
                        src={mess?.fndInfo?.cover}
                        alt=""
                      />
                      <div
                        className="circle_icon_notification"
                        style={{
                          position: "absolute",
                          bottom: "6px",
                          left: "0px",
                        }}
                      >
                        <img
                          style={{
                            width: "37px",
                            height: "37px",
                            backgroundColor: "#C8C9D4",
                            border: "2.5px solid #fff",
                          }}
                          src="https://scontent.xx.fbcdn.net/v/t1.15752-9/311070626_1205014643680530_1668259112361737223_n.png?stp=dst-png_p206x206&_nc_cat=1&ccb=1-7&_nc_sid=61f064&_nc_ohc=OOUSxmZvpX4AX9Ec52l&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSfANxf_j6Qxp6IFN6vPDk365_uJnnsLAWTOqrpxQrwCA&oe=65ADD407"
                          alt=""
                        />
                      </div>
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#65676B",
                          fontWeight: "400",
                        }}
                      >
                        {mess?.fndInfo?.group_name}
                      </p>
                      <div
                        className="user_name"
                        style={{ marginLeft: "0px", fontSize: "15px" }}
                      >
                        {mess?.room_name}
                      </div>
                      <p
                        style={
                          !mess?.msgInfo?.seen.includes(user.id) &&
                          mess?.msgInfo?.senderId !== user.id
                            ? {
                                fontSize: "13px",
                                color: "#050505",
                                fontWeight: "600",
                              }
                            : {
                                fontSize: "13px",
                                color: "#65676B",
                                fontWeight: "400",
                              }
                        }
                      >
                        {mess?.msgInfo?.senderId === user.id && "You: "}
                        {!mess?.msgInfo?.image
                          ? mess?.msgInfo?.message
                          : mess?.msgInfo?.senderId === user.id
                          ? "You sent a photo"
                          : "Someone sent a photo"}
                      </p>
                    </div>

                    {!mess?.msgInfo?.seen.includes(user.id) &&
                      mess?.msgInfo?.senderId !== user.id && (
                        <div
                          className="notification_icon_active "
                          style={{
                            width: "10px",
                            right: "2px",
                            position: "absolute",
                          }}
                        />
                      )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="mmenu_item hover3"
                  style={{ cursor: "pointer" }}
                  key={i}
                  onClick={() => {
                    setShowMessMenu(false);
                    openChatWindow({
                      _id: mess?.fndInfo?._id,
                      picture: mess?.fndInfo?.picture,
                      first_name: mess?.fndInfo?.first_name,
                      last_name: mess?.fndInfo?.last_name,
                    });
                  }}
                >
                  <div className="profile_link">
                    <div className="circle_icon_notification">
                      <img
                        src={mess?.fndInfo?.picture}
                        alt=""
                        style={{ width: "56px", height: "56px" }}
                      />
                      <div className="right_bottom_notification">
                        {onlineUsers.some(
                          (user) => user.userId === mess?.fndInfo?._id
                        ) && (
                          <div
                            className="state_active_user_mess"
                            style={{
                              width: "14px",
                              height: "14px",
                              left: "-18px",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <div
                        className="user_name"
                        style={{ marginLeft: "0px", fontSize: "15px" }}
                      >
                        {mess?.fndInfo?.first_name} {mess?.fndInfo?.last_name}
                      </div>
                      <p
                        style={
                          mess?.msgInfo?.status === "unseen" &&
                          mess?.msgInfo?.senderId !== user.id
                            ? {
                                fontSize: "13px",
                                color: "#050505",
                                fontWeight: "600",
                              }
                            : {
                                fontSize: "13px",
                                color: "#65676B",
                                fontWeight: "400",
                              }
                        }
                      >
                        {mess?.msgInfo?.senderId === user.id && "You: "}
                        {!mess?.msgInfo?.image
                          ? mess?.msgInfo?.message
                          : mess?.msgInfo?.senderId === user.id
                          ? "You sent a photo"
                          : `${mess?.fndInfo?.last_name} sent a photo`}
                      </p>
                    </div>
                    {mess?.msgInfo?.status === "unseen" &&
                      mess?.msgInfo?.senderId !== user.id && (
                        <div
                          className="notification_icon_active "
                          style={{
                            width: "10px",
                            right: "2px",
                            position: "absolute",
                          }}
                        />
                      )}
                  </div>
                </div>
              </>
            )}
          </>
        ))
      ) : (
        <div className="mmenu_item  imgNotification">
          <img src="../../../../images/notification.png" alt="" />
        </div>
      )}
      <div className="mmenu_splitter"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          font: "15px",
          color: "#0064D1",
          fontWeight: "600",
          paddingTop: "10px",
          cursor: "auto",
        }}
      >
        <button
          className=""
          style={{
            display: "inline-block",
            padding: "10px 20px", // Khoảng cách trong nút
            fontSize: "16px", // Kích thước chữ
            fontWeight: "bold",
            color: "white", // Màu chữ
            background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient màu nền
            border: "none", // Bỏ viền
            borderRadius: "25px", // Bo tròn góc
            cursor: "pointer", // Con trỏ chuột
            transition: "all 0.3s ease-in-out", // Hiệu ứng chuyển đổi
            textAlign: "center", // Căn giữa nội dung
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #2575fc, #6a11cb)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #6a11cb, #2575fc)";
            e.target.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.95)";
            e.target.style.background =
              "linear-gradient(135deg, #4b0082, #1e90ff)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.background =
              "linear-gradient(135deg, #2575fc, #6a11cb)";
          }}
        >
          <Link
            to="/messages"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Fullscreen Chatbox
          </Link>
        </button>
      </div>
    </div>
  );
}
