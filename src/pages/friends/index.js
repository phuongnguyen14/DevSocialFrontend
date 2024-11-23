import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import { RingLoader } from "react-spinners";
import Card from "./Card";
import {
  PeopleAlt,
  PersonAddAlt,
  Outbound,
  Group,
} from "@mui/icons-material";
import FriendCard from "../../components/friend/FriendCard";
import "./style.css";
export default function Friends({
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
  getUser,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  console.log(dataFriend.requests);
  return (
    <>
      <Header
        page="friends"
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
            <h2 className="friend_left_title">Friend</h2>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && "active_friends"
              }`}
            >
              <div className="friend_left_tab">
                <div className="small_circle">
                <PeopleAlt style={{ fontSize: 24, color: "var(--icon-color)" }} />
                </div>
                <span>All</span>
                
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === "requests" && "active_friends"
              }`}
            >
              <div className="friend_left_tab">
                <div className="small_circle">
                <PersonAddAlt style={{ fontSize: 24, color: "var(--icon-color)" }} />
                </div>
                <span>Friend Request</span>
                
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === "sent" && "active_friends"
              }`}
            >
              <div className="friend_left_tab">
                <div className="small_circle">
                <Outbound style={{ fontSize: 24, color: "var(--icon-color)" }} />
                </div>
                <span>Your Requests</span>
                
              </div>
            </Link>

            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === "all" && "active_friends"
              }`}
            >
              <div className="friend_left_tab">
                <div className="small_circle">
                <Group style={{ fontSize: 24, color: "var(--icon-color)" }} />
                </div>
                <span>Your Friends</span>
                
              </div>
            </Link>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div
                className="flex_wrap"
                style={{
                  justifyContent:
                    dataFriend.friends?.length > 0 ? "flex-start" : "center",
                }}
              >
                {friendsLoading ? (
                  <div className="sekelton_loader">
                    <RingLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataFriend.friends?.length > 0 ? (
                      dataFriend.friends.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="friends"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{ flexDirection: "column" }}
                      >
                        <img
                          src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_dark_mode.svg"
                          alt=""
                        />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {(type === undefined || type === "requests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>

              <div
                className="flex_wrap"
                style={{
                  justifyContent:
                    dataFriend.requests?.length > 0 ? "flex-start" : "center",
                }}
              >
                {friendsLoading ? (
                  <>
                    <div className="sekelton_loader">
                      <RingLoader color="#1876f2" />
                    </div>
                  </>
                ) : (
                  <>
                    {dataFriend.requests?.length > 0 ? (
                      dataFriend.requests.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="request"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_dark_mode.svg"
                          alt=""
                        />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {(type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Your Requests</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div
                className="flex_wrap"
                style={{
                  justifyContent:
                    dataFriend.sentRequests?.length > 0
                      ? "flex-start"
                      : "center",
                }}
              >
                {friendsLoading ? (
                  <div className="sekelton_loader">
                    <RingLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataFriend.sentRequests?.length > 0 ? (
                      dataFriend.sentRequests.map((user) => (
                        <Card
                          userr={user}
                          key={user._id}
                          type="sent"
                          getData={getDataFriend}
                          socket={socket}
                        />
                      ))
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_dark_mode.svg"
                          alt=""
                        />
                        <p>No user to show</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {type === "birthdays" && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Birthdays</h3>
              </div>
              <div
                className="flex_wrap"
                style={{
                  justifyContent:
                    dataByBirthday.todayBirthdays?.length > 0 ||
                    dataByBirthday.comingBirthdays?.length ||
                    dataByBirthday.comingBirthdays?.length > 0
                      ? "flex-start"
                      : "center",
                }}
              >
                {friendsByBirthdayLoading ? (
                  <div className="sekelton_loader">
                    <RingLoader color="#1876f2" />
                  </div>
                ) : (
                  <>
                    {dataByBirthday.todayBirthdays?.length > 0 ? (
                      <div className="profile_card">
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            paddingBottom: "10px",
                          }}
                        >
                          Today's Birthdays
                        </p>
                        {dataByBirthday.todayBirthdays.map(
                          (user, cardIndex) => (
                            <Card
                              userr={user}
                              key={user._id}
                              type="friends"
                              getData={getDataFriend}
                              socket={socket}
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <div
                        className="No_results"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_dark_mode.svg"
                          alt=""
                        />
                        <p>No user to show</p>
                      </div>
                    )}

                    {dataByBirthday.comingBirthdays?.length > 0 && (
                      <div
                        className="profile_card"
                        style={{ marginLeft: "370px" }}
                      >
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "20px",
                            paddingBottom: "10px",
                          }}
                        >
                          Upcoming Birthdays
                        </p>
                        {dataByBirthday.comingBirthdays.map(
                          (user, cardIndex) => (
                            <Card
                              userr={user}
                              key={user._id}
                              type="friends"
                              getData={getDataFriend}
                              socket={socket}
                            />
                          )
                        )}
                      </div>
                    )}
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
