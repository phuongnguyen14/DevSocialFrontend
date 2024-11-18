import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css"
const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ setVisible, socket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  // Validation schema cho Formik
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .test(
        "is-valid-email",
        "Must be a valid email address or username.",
        (value) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || // Email hợp lệ
          /^[a-zA-Z0-9._-]+$/.test(value) // Chỉ chứa tên (không có @)
      )
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Hàm xử lý submit
  const loginSubmit = async () => {
    try {
      setLoading(true);

      // Bổ sung @gmail.com nếu email không chứa domain
      const formattedEmail = email.includes("@") ? email : `${email}@gmail.com`;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email: formattedEmail, password }
      );

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <h1 className="title">Social Network</h1>
        <br/>
        <span className="content">
        Join with us now !
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form >
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                 
                  onInput={(e) => {
                    // Khi bắt đầu nhập, thay đổi màu chữ thành trắng
                    e.target.style.color = "#ffffff"; // Chữ màu trắng khi nhập
                  }}
                  onBlur={(e) => {
                    // Khi mất tiêu điểm, vẫn giữ màu trắng cho chữ
                    e.target.style.background = "rgba(var(--bg-primary-rgb), 0.8)"; // Trở lại màu nền trắng trong suốt
                  }}
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.8)", // Màu nền trắng trong suốt
                    color: "#ffffff",                                     // Chữ mặc định màu trắng
                    border: "1px solid rgba(255, 255, 255, 0.6)",          // Viền trắng trong suốt
                    padding: "10px",                                       // Khoảng cách bên trong
                    borderRadius: "4px",                                   // Bo góc
                    backdropFilter: "blur(20px)",                           // Hiệu ứng mờ
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",              // Đổ bóng nhẹ
                  }}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                  onInput={(e) => {
                    // Khi bắt đầu nhập, thay đổi màu chữ thành trắng
                    e.target.style.color = "#ffffff"; // Chữ màu trắng khi nhập
                  }}
                  onBlur={(e) => {
                    // Khi mất tiêu điểm, vẫn giữ màu trắng cho chữ
                    e.target.style.background = "rgba(var(--bg-primary-rgb), 0.8)"; // Trở lại màu nền trắng trong suốt
                  }}
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.8)", // Màu nền trắng trong suốt
                    color: "#ffffff",                                     // Chữ mặc định màu trắng
                    border: "1px solid rgba(255, 255, 255, 0.6)",          // Viền trắng trong suốt
                    padding: "10px",                                       // Khoảng cách bên trong
                    borderRadius: "4px",                                   // Bo góc
                    backdropFilter: "blur(20px)",                           // Hiệu ứng mờ
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",              // Đổ bóng nhẹ
                  }}
                />
                <button type="submit" className="login_bt">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <div >
            <Link to="/reset" className="forgot_password" style={{marginRight:"20px"}}>
              Forgot password
            </Link>
            <Link to="/verifi" className="forgot_password">
              Verify
            </Link>
          </div>

          <DotLoader color='rgba(135, 206, 235, 0.8)' loading={loading} size={30} />

          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="create_btn"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        
      </div>
    </div>
  );
}
