import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="navbar">
      <div onClick={() => navigate("/")}>
        <h1>Book Explorer</h1>
      </div>

      <div className="options">
        <button
          style={{ cursor: "pointer", background:"#2ecc71" }}
          onClick={() => navigate("/add-book")}
        >
          Add book
        </button>
        <button style={{ cursor: "pointer", background: "#3498db" }} onClick={handleLogout}>
          {auth.isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
