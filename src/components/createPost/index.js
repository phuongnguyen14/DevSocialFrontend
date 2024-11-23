import { VideoCall, PhotoLibraryOutlined, SentimentSatisfiedAltOutlined, Event,VideoStableOutlined } from '@mui/icons-material';
import UserMenu from "../header/userMenu";
import "./style.css";

export default function CreatePost({ user, setVisible, profile, page }) {
  const iconStyle = { color: 'rgba(135, 206, 235, 0.8)', fontSize: '32px' };

  return (
    <div className="createPost">
      <div
        className="createPost_header"
        style={page === "home" ? { marginTop: "0", width: "685px" } : { marginTop: "1.1rem", width: "100%" }}
      >
        <img src={user?.picture} alt="" />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <VideoStableOutlined style={iconStyle} />
          Stream
        </div>
        <div className="createPost_icon hover1" onClick={() => setVisible(true)}>
          <PhotoLibraryOutlined style={iconStyle} />
          Image
        </div>
        {profile ? (
          <div className="createPost_icon hover1">
            <Event style={iconStyle} />
            Life Event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <SentimentSatisfiedAltOutlined style={iconStyle} />
            Emoji
          </div>
        )}
      </div>
    </div>
  );
}