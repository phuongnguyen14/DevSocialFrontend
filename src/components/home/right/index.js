import { Dots, NewRoom, Search } from "../../../svg";
import Contact from "./Contact";
import FriendRequests from "./FriendRequests";
import InviteGroup from "./InviteGroup";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import "./style.css";
import RoomMess from "./RoomMess";
export default function RightHome({
  user,
  dataFriend,
  getDataFriend,
  setShowChat,
  socket,
  dataByBirthday,
  getDatafriendsByBirthday,
  dataRoomMess,
  setShowChatRoom,
  onlineUsers,
  getListMess,
  openChatWindow,
  listMess
}) {
  const color = "#65676b";

  return (
    <div className="right_home scrollbar" style={{width:"313px"}}>
      <div className="right1">
      <div className="heading">
        <PersonAddIcon/>
        Friend Request</div>
      <FriendRequests
        user={user}
        dataFriend={dataFriend}
        getDataFriend={getDataFriend}
        socket={socket}
      />
      </div>
     
      <div className="right1">
      <div className="heading">
        <ConnectWithoutContactIcon/>
        Group Invitation</div>
      <InviteGroup
        user={user}
        dataFriend={dataFriend}
        getDataFriend={getDataFriend}
        socket={socket}
        className="text_heading"
      />
      </div>

      

      <div className="right1">
      <div className="contacts_wrap">
        <div className="heading">
          
            <ContactMailIcon/>
            Contact
          
        </div>
        <div className="contacts_list">
          <Contact
            user={user}
            dataFriend={dataFriend}
            setShowChat={setShowChat}
            setShowChatRoom={setShowChatRoom}
            onlineUsers={onlineUsers}
            getListMess={getListMess}
            openChatWindow={openChatWindow}
            listMess={listMess}
          />
        </div>
        <div className="splitter1" style={{width:"270px", marginLeft:"0px"}}></div>
        <div className="contacts_header">
          <div className="contacts_header_left"style={{display:"flex", alignItems:"center", gap:"12px", fontSize:"16px",color:"var(--color-primary)" }}>
            <QuestionAnswerIcon />
            Group chat</div>
        </div>
        <div className="contacts_list">
          <RoomMess
            user={user}
            dataRoomMess={dataRoomMess}
            setShowChatRoom={setShowChatRoom}
            setShowChat={setShowChat}
            onlineUsers={onlineUsers}
            openChatWindow={openChatWindow}
            getListMess={getListMess}
          />
        </div>
      </div>
      </div>

      
    </div>
  );
}
