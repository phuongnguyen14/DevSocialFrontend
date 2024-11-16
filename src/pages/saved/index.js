import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import { PuffLoader } from "react-spinners";
import GradeIcon from "@mui/icons-material/Grade";

import Post from "../../components/post";
import "./style.css";
export default function Saved({
  getAllPosts,
  socket,
  notifications,
  setNotifi,
  dataFriend,
  getDataFriend,
  friendsLoading,
  dataByBirthday,
  getDatafriendsByBirthday,
  friendsByBirthdayLoading,
  listMess,
  loadingListMess,
  onlineUsers,
  openChatWindow,
  setOpenChatWindows,
  listPostSaved,
  postGroupsLoading,
  setVisiblePost,
  visibleReact,
  setVisibleReact,
  setVisibleReactComment,
  visibleReactComment,
  setVisiblePhoto,
  getListPostSaved,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    getListPostSaved();
  }, []);

  console.log(listPostSaved);
  return (
    <>
      <Header
        page="saved"
        getAllPosts={getAllPosts}
        socket={socket}
        notifications={notifications}
        setNotifi={setNotifi}
        listMess={listMess}
        loadingListMess={loadingListMess}
        onlineUsers={onlineUsers}
        openChatWindow={openChatWindow}
        setOpenChatWindows={setOpenChatWindows}
      />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Saved</h2>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap" style={{ marginTop: "10px" }}>
            {" "}
            <div className="mmenu_item active_friends hover3 ">
              <div
                className="small_circle"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0", // Tùy chọn: nền màu sáng
                  borderRadius: "50%",
                  width: "40px", // Tùy chỉnh kích thước của vòng tròn
                  height: "40px", // Tùy chỉnh kích thước của vòng tròn
                  transition: "transform 0.3s", // Thêm hiệu ứng phóng to
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2)"; // Phóng to khi hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"; // Trở lại kích thước ban đầu khi rời khỏi
                }}
              >
                <GradeIcon
                  style={{
                    color: "white", // Màu trắng cho icon
                    fontSize: "24px", // Kích thước icon
                    transition: "transform 0.3s", // Hiệu ứng khi phóng to
                  }}
                />
              </div>
              <span>Saved posts</span>
            </div>
          </div>
          <div className="mmenu_splitter" style={{ marginTop: "8px" }}></div>
        </div>
        <div className="friends_right" style={{ overflowX: "hidden" }}>
          <div className="friends_right_wrap">
            {postGroupsLoading ? (
              <div className="sekelton_loader">
                <PuffLoader color="#1876f2" />
              </div>
            ) : (
              <div className="posts" style={{ marginLeft: "310px" }}>
                {listPostSaved && listPostSaved?.length > 0 ? (
                  listPostSaved.map((post) => (
                    <Post
                      post={post}
                      user={user}
                      key={post._id}
                      dataPageGroup
                      socket={socket}
                      postId={undefined}
                      setVisiblePost={setVisiblePost}
                      visibleReact={visibleReact}
                      setVisibleReact={setVisibleReact}
                      commentId={undefined}
                      setVisibleReactComment={setVisibleReactComment}
                      visibleReactComment={visibleReactComment}
                      setVisiblePhoto={setVisiblePhoto}
                      page="home"
                    />
                  ))
                ) : (
                  <div className="no_posts" style={{ marginRight: "654px" }}>
                    Empty
                  </div>
                )}
              </div>
            )}
            <div className="flex_wrap"></div>
          </div>
        </div>
      </div>
    </>
  );
}
