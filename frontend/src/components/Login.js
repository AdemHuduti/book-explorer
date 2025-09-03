import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

function Login() {
  const URL = "/api/accounts/login/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const onFormSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  const postData = async () => {
    try {
      const response = await api.post(URL, {
        email,
        password,
      });
      localStorage.setItem("token", response?.data.access);
      localStorage.setItem("refreshToken", response?.data.refresh);
      if (response?.data.access && response?.data.refresh) {
        navigate("/books");
        auth.login();
      }
    } catch (error) {
      console.log("error here", error);
      // setErrorMessage(error.response.data.detail);
      setErrorMessage(error.response?.data?.email);
      setPasswordError(error.response?.data?.password);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onFormSubmit(e)} className="form">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Email: </label>
          <input
            placeholder="Enter your email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />

          {
            errorMessage && <small style={{ color: "red" }}>{errorMessage}</small>
          }
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}

          {
            passwordError && <small style={{ color: "red" }}>{passwordError}</small>
          }
        </div>

        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
