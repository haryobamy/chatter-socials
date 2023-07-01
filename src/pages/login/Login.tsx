import { CircularProgress } from "@mui/material";
import React from "react";
import "./login.css";
// import { loginCall } from "../../apiCalls";
// import { AuthContext } from "../../context/AuthContext";
// import { CircularProgress } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@/constant/redux/hooks/index";
import { login } from "@/constant/redux/auth/authApi";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "@/constant/redux/auth/authSlice";
import { DB_USER } from "@/constant/https/config";

export default function Login() {
  const navigate = useNavigate();
  const email = React.useRef<any>();
  const password = React.useRef<any>();
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state?.auth);
  // const { isFetching, dispatch } = React.useContext(AuthContext);

  const handleClick = async () => {
    // e.preventDefault();
    const payload = {
      email: email.current.value,
      password: password.current.value,
    };
    const res = await dispatch(login(payload));
    if (res.payload.status === "success") {
      localStorage.setItem(DB_USER, res.payload.data.access_token);
      // addToast("Login successful!", { appearance: "success" });
      dispatch(setIsLogin(true));
      navigate("/");
    }

    // loginCall({}, dispatch);
  };

  // const {} = useAppSelector((state) => state?.auth);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chattersocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chatttersocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              // minLength="6"
              className="loginInput"
              ref={password}
            />
            <button
              className="loginButton"
              onClick={handleClick}
              // disabled={loading}
            >
              {loading ? <CircularProgress size="20px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {loading ? (
                <CircularProgress size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
