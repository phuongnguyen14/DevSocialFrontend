import { Form, Formik } from "formik";
import ChoosePrivacy from "../../components/inputs/createGroupInput/choosePrivacy";
import GroupInput from "../../components/inputs/createGroupInput";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";

export default function CreateRoomMess({
  setVisibleCreatRoomMess,
  socket,
  dataPageGroup,
  getPageGroup,
  getRoomMess,
}) {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [results, setResults] = useState([]);
  const [invite, setInvite] = useState([]);
  const [inputValue, setInputValue] = useState(""); 
  const groupValidation = Yup.object({
    room_name: Yup.string().required("What's your Chat name ?"),
  });
  const roomInfos = {
    room_name: "", 
    groupRef: "", 
  };

  const [room, setGroup] = useState(roomInfos);
  const { room_name, groupRef } = room;

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...room, [name]: value });
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const roommessSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/creatRoomMess`,
        {
          room_name,
          groupRef: dataPageGroup._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        setVisibleCreatRoomMess(false);
        getRoomMess();
      }, 1000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header" >
          <i
            className="exit_icon"
            onClick={() => setVisibleCreatRoomMess(false)}
          ></i>
          <span style={{display:"flex", justifyContent:"center", fontSize:"30px"}}>Group chat</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            room_name,
            groupRef,
          }}
          validationSchema={groupValidation}
          onSubmit={() => {
            roommessSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line" style={{marginTop:"10px"}}>
                <span style={{display:"flex", alignItems:"center"}}>Name:</span>
                <GroupInput
                  type="text"
                  placeholder="Name group chat"
                  name="room_name"
                  onChange={handleRoomChange}
                />
              </div>

              <div className="reg_btn_wrapper">
  <button
    className="blue_btn open_signup"
    style={{
      background: 'linear-gradient(135deg, #00c6ff, #0072ff)', // Màu gradient
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, background 0.3s ease', // Hiệu ứng hover
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.1)'; // Phóng to khi hover
      e.target.style.background = 'linear-gradient(135deg, #0072ff, #00c6ff)'; // Đảo ngược gradient khi hover
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1)'; // Trở lại kích thước ban đầu khi không hover
      e.target.style.background = 'linear-gradient(135deg, #00c6ff, #0072ff)'; // Trở lại màu gradient ban đầu
    }}
  >
    Create chat
  </button>
</div>

              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
