import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const URL = "/api/accounts/register/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [sameEmail, setSameEmail] = useState("");
  const [successRegister, setSuccessRegister] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    postDataRegister();
  };

  const postDataRegister = async () => {
    console.log("Posting data...");
    try {
      const response = await api.post(URL, {
        email,
        password,
        password2,
      });

      if (response) {
        setErrorMessage("");
        setPasswordNotMatch("");
        setSameEmail("");

        setSuccessRegister(
          "User successfully registered. Please login with same credentials."
        );
      }
    } catch (error) {
      console.log("error here", error);
      setErrorMessage(error.response?.data?.password);
      setPasswordNotMatch(error.response?.data.password2);
      setSameEmail(error.response?.data.email);
      setSuccessRegister("");
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
        </div>
        <div style={{ width: "300px" }}>
          {sameEmail && <small style={{ color: "red" }}>{sameEmail}</small>}
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
          />
          <div style={{ width: "300px" }}>
            {errorMessage && (
              <small style={{ color: "red" }}>{errorMessage}</small>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Confirm your password</label>
          <input
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <small style={{ color: "red" }}>
            {passwordNotMatch && passwordNotMatch}
          </small>
        </div>
        <div>
          {successRegister && (
            <small style={{ color: "green", fontWeight: "bold" }}>{successRegister}</small>
          )}
        </div>
        <div>
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate("/login")}>
            Login here
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
