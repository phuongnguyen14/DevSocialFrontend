import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import CreateGroup from "./createGroup";
import "./style.css";
import { PuffLoader } from "react-spinners";
import { getGroupsJoined, getdiscoverGroups } from "../../functions/user";
import axios from "axios";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PageviewIcon from "@mui/icons-material/Pageview";
import GroupsIcon from "@mui/icons-material/Groups";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import Card_Group from "./Card_Group";
import InviteGroups from "./InviteGroups";
import Card_Discover_Group from "./Card_Discover_Group";
import Post from "../../components/post";
import { Public } from "../../svg";
import { Groups2Outlined } from "@mui/icons-material";
export default function Groups({
  getAllPosts,
  socket,
  notifications,
  setNotifi,
  dataFriend,
  getDataFriend,
  setVisiblePost,
  visibleReact,
  setVisibleReact,
  setVisibleReactComment,
  visibleReactComment,
  getGroups,
  getDiscoverGroups,
  postGroupsLoading,
  dataPostGroups,
  groupsLoading,
  discoverGroupsLoading,
  dataDiscoverGroups,
  dataGroups,
  setVisiblePhoto,
  listMess,
  loadingListMess,
  onlineUsers,
  openChatWindow,
  setOpenChatWindows,
  User,
  getUserData,
  setReport,
  setReportGroup,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header
        page="groups"
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
      {visible && (
        <CreateGroup
          setVisible={setVisible}
          dataFriend={dataFriend}
          socket={socket}
        />
      )}
      <div className="friends">
        <div
          className="friends_left scrollbar"
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <div className="friends_left_header">
            <h2 className="group_left_title">Group</h2>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/groups"
              className={`mmenu_item hover3 ${
                type === undefined ? "active_friends" : ""
              }`}
            >
              <div className="group_left_tab">
                <div className="small_circle">
                  {type === undefined ? (
                    <DynamicFeedIcon style={{ color: "white" }} />
                  ) : (
                    <DynamicFeedOutlinedIcon />
                  )}
                </div>
                <span>Group's feed</span>
              </div>
            </Link>

            <Link
              to="/groups/discover"
              className={`mmenu_item hover3 ${
                type === "discover" ? "active_friends" : ""
              }`}
            >
              <div className="group_left_tab">
                <div className="small_circle">
                  {type === "discover" ? (
                    <PageviewIcon style={{ color: "white" }} />
                  ) : (
                    <PageviewOutlinedIcon />
                  )}
                </div>
                <span>All group</span>
              </div>
            </Link>

            <Link
              to="/groups/yourgroups"
              className={`mmenu_item hover3 ${
                type === "yourgroups" ? "active_friends" : ""
              }`}
            >
              <div className="group_left_tab">
                <div className="small_circle">
                  {type === "yourgroups" ? (
                    <GroupsIcon style={{ color: "white" }} />
                  ) : (
                    <Groups2Outlined />
                  )}
                </div>
                <span>Your group</span>
              </div>
            </Link>

            <div
              className="hover5"
              style={{
                marginTop: "10px",
                backgroundColor: "#559ED6", // Màu xanh lam nhạt
                color: "white", // Màu trắng cho cả chữ và icon
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Căn giữa icon và chữ
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease", // Hiệu ứng mượt mà cho hover
                transform: "scale(1)", // Kích thước mặc định
                border: "none",
              }}
              onClick={() => setVisible(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#87CEFA"; // Màu xanh đậm hơn khi hover
                e.currentTarget.style.transform = "scale(1.05)"; // Phóng to khi hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#559ED6";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ControlPointDuplicateOutlinedIcon
                style={{ color: "white", marginRight: "8px" }}
              />
              <p style={{ margin: 0 }}>Create group</p>
            </div>

            <div className="group_tab_box">
              <div
                className="mmenu_item"
                style={{ cursor: "auto", fontSize: "17px" }}
              >
                <span
                  className="group_tab_title"
                  style={{
                    display: "inline-flex", // Đặt các phần tử trong cùng một dòng
                    alignItems: "center", // Căn giữa icon và text theo chiều dọc
                    verticalAlign: "middle",
                  }}
                >
                  <EditNoteIcon
                    style={{ fontSize: "30px", marginRight: "10px" }}
                  />
                  Manage
                </span>
              </div>
              <div className="splitter" style={{fontSize:"5px",marginBottom:"10px", marginTop:"0px", marginLeft:"-5px", marginRight:"5px"}}>
                
              </div>
              {groupsLoading ? (
                <div className="sekelton_loader">
                  <PuffLoader color="#1876f2" />
                </div>
              ) : (
                <>
                  {dataGroups.adminGroups &&
                    dataGroups.adminGroups.map((group) => (
                      <>
                        <Link
                          to={`/group/${group?._id}`}
                          className="req_card_pagegroup hover3"
                          style={{ width: "97%", borderRadius: "10px" }}
                        >
                          <div className="group_content_pagegroup">
                            <div className="content_head_pagegroup">
                              <div>
                                <img src={group?.cover} alt="" />
                              </div>
                              <div>
                                <div className="req_name">
                                  {group?.group_name}
                                </div>
                                <div
                                  className="post_profile_privacy_date"
                                  style={{ gap: "5px" }}
                                >
                                  {group.public ? (
                                    <>
                                      {" "}
                                      <p>Public group</p> <p>.</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>Private group</p>
                                      <p>.</p>
                                    </>
                                  )}
                                  <p>
                                    {group?.numMembers}{" "}
                                    {group?.numMembers === 1
                                      ? "member"
                                      : "members"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    ))}
                </>
              )}
            </div>
            <div className="group_tab_box">
              <div
                className="mmenu_item"
                style={{ cursor: "auto", fontSize: "17px" }}
              >
                <span
                  className="group_tab_title"
                  style={{
                    display: "inline-flex", // Đặt các phần tử trong cùng một dòng
                    alignItems: "center", // Căn giữa icon và text theo chiều dọc
                    verticalAlign: "middle",
                  }}
                >
                  <PlaylistAddCheckIcon
                    style={{ fontSize: "30px", marginRight: "10px" }}
                  />
                  Joined Group
                </span>
              </div>
              <div className="splitter" style={{marginBottom:"10px", marginTop:"0px", marginLeft:"-5px", marginRight:"5px"}}></div>
              {groupsLoading ? (
                <div className="sekelton_loader">
                  <PuffLoader color="#1876f2" />
                </div>
              ) : (
                <>
                  {dataGroups.memberGroups &&
                    dataGroups.memberGroups.map((group) => (
                      <>
                        <Link
                          to={`/group/${group?._id}`}
                          className="req_card_pagegroup hover3"
                          style={{ width: "97%", borderRadius: "10px" }}
                        >
                          <div className="group_content_pagegroup">
                            <div className="content_head_pagegroup">
                              <div>
                                <img src={group?.cover} alt="" />
                              </div>
                              <div>
                                <div className="req_name">
                                  {group?.group_name}
                                </div>
                                <div
                                  className="post_profile_privacy_date"
                                  style={{ gap: "5px" }}
                                >
                                  {group.public ? (
                                    <>
                                      {" "}
                                      <p>Public group</p> <p>.</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>Private group</p>
                                      <p>.</p>
                                    </>
                                  )}
                                  <p>
                                    {group?.numMembers}{" "}
                                    {group?.numMembers === 1
                                      ? "member"
                                      : "members"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="friends_right" style={{ overflowX: "hidden" }}>
          {type === undefined && (
            <div className="friends_right_wrap">
              {postGroupsLoading ? (
                <div className="sekelton_loader">
                  <PuffLoader color="#1876f2" />
                </div>
              ) : (
                <div className="posts" style={{ marginLeft: "220px" }}>
                  {dataPostGroups && dataPostGroups?.length > 0 ? (
                    dataPostGroups.map((post) => (
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
                        setReport={setReport}
                        setReportGroup={setReportGroup}
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
          )}
          {type === "discover" && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Invitations to join the group</h3>
              </div>
              <div className="flex_wrap">
                {groupsLoading ? (
                  <div className="sekelton_loader">
                    <PuffLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    <InviteGroups
                      user={user}
                      dataFriend={dataFriend}
                      getDataFriend={getDataFriend}
                      socket={socket}
                      getGroups={getGroups}
                      getDiscoverGroups={getDiscoverGroups}
                    />
                  </>
                )}
              </div>
              <div className="friends_left_header">
                <h3>More suggestions</h3>
              </div>
              <div className="flex_wrap">
                {discoverGroupsLoading ? (
                  <div className="sekelton_loader">
                    <PuffLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataDiscoverGroups &&
                      dataDiscoverGroups.map((group) => (
                        <>
                          <Card_Discover_Group
                            user={user}
                            group={group}
                            key={group._id}
                            getDataFriend={getDataFriend}
                            getGroups={getGroups}
                            getDiscoverGroups={getDiscoverGroups}
                          />
                        </>
                      ))}
                  </>
                )}
              </div>
              <div className="flex_wrap"></div>
            </div>
          )}
          {type === "yourgroups" && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>All groups joined</h3>
              </div>
              <div className="flex_wrap">
                {groupsLoading ? (
                  <div className="sekelton_loader">
                    <PuffLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataGroups.allGroups &&
                      dataGroups.allGroups.map((group) => (
                        <>
                          <Card_Group
                            group={group}
                            key={group._id}
                            getGroups={getGroups}
                            User={User}
                            getUserData={getUserData}
                          />
                        </>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
