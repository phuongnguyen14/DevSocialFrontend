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
        <div className="register_header">
          <i
            className="exit_icon"
            onClick={() => setVisibleCreatRoomMess(false)}
          ></i>
          <span>New community chat</span>
          <span>it's quick and easy</span>
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
              <div className="reg_line">
                <GroupInput
                  type="text"
                  placeholder="Name your chat"
                  name="room_name"
                  onChange={handleRoomChange}
                />
              </div>

              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Create chat</button>
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
