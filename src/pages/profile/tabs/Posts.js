import { useEffect, useReducer, useRef, useState } from "react";
import CreatePost from "../../../components/createPost";
import Post from "../../../components/post";
import Photos from "../Photos";
import Friends from "../Friends";
import Intro from "../../../components/intro";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
export default function Posts({
  profile,
  loading,
  visitor,
  setOthername,
  idUser,
  photos,
  setVisible,
  profileTop,
  socket,
  setVisiblePost,
  visibleReact,
  setVisibleReact,
  commentId,
  postId,
  setVisibleReactComment,
  visibleReactComment,
  setPhotoDetail,
  setVisiblePhoto,
  scrollToPost,
  setReportGroup,
  setReport
}) {
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  const { user } = useSelector((state) => ({ ...state }));

  const leftSide = useRef(null);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 26);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });

    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);


  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  return (
    <>
      
      <div
        className={`profile_grid ${
          check && scrollHeight >= height && leftHeight > 800
            ? "scrollFixed showLess"
            : check &&
              scrollHeight >= height &&
              leftHeight < 800 &&
              "scrollFixed showMore"
        }`}
      >
        <div className="profile_left" ref={leftSide} style={{width:"480.52px"}}>
          {loading ? (
            <>
              <div className="profile_card">
                <div className="profile_card_header">Intro</div>
                <div className="sekelton_loader">
                  <HashLoader color="#1876f2" />
                </div>
              </div>
              <div className="profile_card">
                <div className="profile_card_header">
                  Photos
                  <div className="profile_header_link">See all photos</div>
                </div>
                <div className="sekelton_loader">
                  <HashLoader color="#1876f2" />
                </div>
              </div>
              <div className="profile_card">
                <div className="profile_card_header">
                  Friends
                  <div className="profile_header_link">See all friends</div>
                </div>
                <div className="sekelton_loader">
                  <HashLoader color="#1876f2" />
                </div>
              </div>
            </>
          ) : (
            <>
              <Intro
                detailss={profile.details}
                visitor={visitor}
                setOthername={setOthername}
              />
              <Photos
                idUser={idUser}
                token={user.token}
                photos={photos}
                setVisiblePhoto={setVisiblePhoto}
              />
              <Friends friends={profile.friends} idUser={idUser} />
            </>
          )}

          <div className="relative_fb_copyright">
            @{user?.first_name} {user?.last_name} 
          </div>
        </div>
        <div className="profile_right">
          {!visitor && (
            <CreatePost user={user} profile setVisible={setVisible} />
          )}
          {loading ? (
            <div className="sekelton_loader">
              <HashLoader color="#1876f2" />
            </div>
          ) : (
            <div className="posts">
              {profile.posts && profile.posts.length ? (
                profile.posts.map((post) => (
                  <Post
                    post={post}
                    user={user}
                    key={post._id}
                    profile
                    socket={socket}
                    postId={postId}
                    setVisiblePost={setVisiblePost}
                    visibleReact={visibleReact}
                    setVisibleReact={setVisibleReact}
                    commentId={commentId}
                    setVisibleReactComment={setVisibleReactComment}
                    visibleReactComment={visibleReactComment}
                    setPhotoDetail={setPhotoDetail}
                    setVisiblePhoto={setVisiblePhoto}
                    setReportGroup={setReportGroup}
                    setReport={setReport}
                  />
                ))
              ) : (
                <div className="no_posts">No posts available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}