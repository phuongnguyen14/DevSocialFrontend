import { useRef, useState } from "react";
import ProfilePicture from "../../components/profielPicture";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";
export default function ProfielPictureInfos({
  profile,
  visitor,
  photos,
  othername,
  socket,
  getDataFriend,
  setVisiblePhoto,
  setShowChat,
  setShowChatRoom,
  openChatWindow,
}) {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  const profilePicture =
    profile.picture !==
    "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png";
  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            onClick={
              profilePicture
                ? () =>
                    setVisiblePhoto({
                      url: profile.picture,
                      type: "profile",
                    })
                : null
            }
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>

          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername">{othername && `(${othername})`}</div>
          </div>
          <div className="profile_friend_count">
            {profile?.friends?.length > 0 && (
              <div className="profile_card_count">
                {profile.friends.length}{" "}
                {profile.friends.length === 1 ? "friend" : "friends"}
              </div>
            )}
          </div>

          <div className="profile_friend_imgs">
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend._id}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=""
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor ? (
        <Friendship
          friendshipp={profile?.friendship}
          profileid={profile._id}
          socket={socket}
          getDataFriend={getDataFriend}
          openChatWindow={openChatWindow}
          setShowChatRoom={setShowChatRoom}
          profile={profile}
        />
      ) : null}
    </div>
  );
}
