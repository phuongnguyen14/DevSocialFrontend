import { Form, Formik } from "formik";
import ChoosePrivacy from "../../components/inputs/createGroupInput/choosePrivacy";
import GroupInput from "../../components/inputs/createGroupInput";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Search } from "../../svg";
import { useEffect, useReducer, useState } from "react";
import SearchInviteFriends from "../../components/inputs/createGroupInput/searchInviteFriends";
import { searchFriends } from "../../functions/user";
import InviteFriends from "../../components/inputs/createGroupInput/invite_friends";
import { sendRequest } from "../../functions/group";
import { createNotification } from "../../functions/notification";
export default function CreateGroup({ setVisible, dataFriend, socket }) {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [results, setResults] = useState([]);
  const [invite, setInvite] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Trạng thái để lưu giá trị nhập
  const groupValidation = Yup.object({
    group_name: Yup.string().required("What's your Group name ?"),
  });
  const groupInfos = {
    group_name: "",
    privacy: "",
    inviteFriends: "",
  };
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSearchMenu(value.trim() !== "");
    if (value === "") {
      setResults([]);
    } else {
      const res = await searchFriends(value, dataFriend.friends, user.token);
      setInvite(invite);
      const filteredResults = res.filter((user) => !invite.includes(user._id));
      setResults(filteredResults);
    }
  };

  const addToInvite = (friend) => {
    const updatedInviteList = [...inviteFriends];
    const updateInvite = invite;
    if (!updatedInviteList.includes(friend)) {
      updatedInviteList.push(friend);
      updateInvite.push(friend._id);
      setInvite(updateInvite);
      setGroup({ ...group, inviteFriends: updatedInviteList });
      const filteredResults = results.filter(
        (user) => !invite.includes(user._id)
      );

      setResults(filteredResults);
    } else {
      console.log("User already invited");
    }
  };
  const removeInvite = (friend) => {
    const updatedInviteList = inviteFriends.filter(
      (user) => user._id !== friend._id
    );
    const updateInvite = invite.filter((id) => id !== friend._id);
    setInvite(updateInvite);
    setGroup({ ...group, inviteFriends: updatedInviteList });
  };

  const [group, setGroup] = useState(groupInfos);
  const { group_name, privacy, inviteFriends } = group;

  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const notification = async (idGroup, receiverId) => {
    await sendRequest(idGroup, user.id, receiverId, user.token);
    const newNotification = await createNotification(
      receiverId,
      "invitejoinGroup",
      null,
      null,
      `/group/${idGroup}`,
      ` <b>${user.first_name} ${user.last_name}</b> has sent you an invitation to the group.`,
      user.token,
      idGroup
    );

    socket.emit("sendNotification", {
      senderId: user.id,
      sender_first_name: user.first_name,
      sender_last_name: user.last_name,
      sender_picture: user.picture,
      receiverId: receiverId,
      type: "invitejoinGroup",
      postId: "",
      commentId: "",
      link: `/group/${idGroup}`,
      description: `<b>${user.first_name} ${user.last_name}</b> has sent you an invitation to the group.`,
      id: newNotification.newnotification._id,
      createdAt: newNotification.newnotification.createdAt,
      groupId: idGroup,
    });
  };

  const groupSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/creatGroup`,
        {
          group_name,
          privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      for (const receiverId of invite) {
        console.log("notifi");
        notification(data.group._id, receiverId);
      }
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        navigate(`/group/${data.group._id}`);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div
          className="register_header"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Create group</span>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            group_name,
            privacy,
            inviteFriends,
            invite,
          }}
          validationSchema={groupValidation}
          onSubmit={() => {
            groupSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <GroupInput
                  type="text"
                  placeholder="Group name"
                  name="group_name"
                  onChange={handleGroupChange}
                />
              </div>
              <div className="reg_line">
                <ChoosePrivacy
                  type="text"
                  name="privacy"
                  onChange={handleGroupChange}
                />
              </div>
              <div className="reg_line">
                <InviteFriends
                  removeInvite={removeInvite}
                  inviteFriends={inviteFriends}
                  type="text"
                  placeholder="Invite friends"
                  name="invite_friends"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={handleInputChange}
                />
              </div>
              <div className="reg_line">
                {showSearchMenu && (
                  <SearchInviteFriends
                    results={results}
                    inputValue={inputValue}
                    addToInvite={addToInvite}
                  />
                )}
              </div>
              <div className="reg_btn_wrapper">
                <button
                  className="blue_btn open_signup"
                  style={{
                    backgroundColor: "#4da7d3",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "all 0.3s ease", // Thêm hiệu ứng phóng to
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)"; // Phóng to khi hover
                    e.target.style.backgroundColor = "#56ccf2"; // Thay đổi màu khi hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)"; // Quay lại kích thước ban đầu khi hover ra
                    e.target.style.backgroundColor = "#4da7d3"; // Quay lại màu ban đầu
                  }}
                >
                  Create group
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
