import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function IllustrationGroup({
  setCoverPicture,
  setShowIllustration,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const Ref = useRef(null);
  useClickOutside(Ref, () => setShowIllustration(false));
  const urls = [
    "https://static.xx.fbcdn.net/rsrc.php/v1/y0/r/6LqGjYteiyw.jpg",
    "https://static.xx.fbcdn.net/rsrc.php/v1/yZ/r/kSv84Nk4u_u.jpg",
    "https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/PNd2xeGky9l.jpg",
    "https://static.xx.fbcdn.net/rsrc.php/v1/yX/r/bE91i3e1sdj.jpg",
    "https://static.xx.fbcdn.net/rsrc.php/v1/y2/r/hVdunlORSAV.jpg",
    
    "https://images6.alphacoders.com/131/thumb-1920-1311862.jpeg",
    "https://images2.alphacoders.com/134/thumb-1920-1347382.png",
    "https://images8.alphacoders.com/118/thumb-1920-1186452.jpg",
    "https://images5.alphacoders.com/115/thumb-1920-1151243.jpg",
    "https://images6.alphacoders.com/136/thumb-1920-1364502.jpeg",
    "https://images8.alphacoders.com/121/thumb-1920-1216465.jpg"

  ];

  return (
    <div className="blur">
      <div className="postBox selectCoverBox"  ref={Ref}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShowIllustration(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Choose illustration</span>
        </div>

        <div className="profile_card_grid_photo scrollbar" style={{width: "800px"}}>
          <div className="friends_right_wrap" style={{marginLeft: "5px"}}>
            <div className="flex_wrap" >
              {urls.map((url, index) => (
                <div className="cover_photos_card"  style={{width: "34%"}}>
                  <img
                    src={url}
                    key={index}
                    alt=""
                    onClick={() => {
                      setCoverPicture(url);
                      setShowIllustration(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
