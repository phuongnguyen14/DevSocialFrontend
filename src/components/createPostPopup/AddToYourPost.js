import {  MyLocation, Mic, MoreHoriz, StyleOutlined, PhotoLibraryOutlined,SentimentSatisfiedAlt } from '@mui/icons-material';
export default function AddToYourPost({ setShowPrev, setBackground }) {
  const iconStyle = { color: 'rgba(135, 206, 235, 0.8)', fontSize: '32px' };

  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <div
        className="post_header_right hover1"
        onClick={() => {
          setBackground("");
          setShowPrev(true);
        }}
      >
        <PhotoLibraryOutlined style={iconStyle} />
      </div>
      <div className="post_header_right hover1">
        <StyleOutlined style={iconStyle} />
      </div>
      <div className="post_header_right hover1">
        <SentimentSatisfiedAlt style={iconStyle} />
      </div>
      <div className="post_header_right hover1">
        <MyLocation style={iconStyle} />
      </div>
      <div className="post_header_right hover1">
        <Mic style={iconStyle} />
      </div>
      <div className="post_header_right hover1">
        <MoreHoriz style={iconStyle} />
      </div>
    </div>
  );
}