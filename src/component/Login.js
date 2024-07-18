import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/AuthStyles.css";
import { isAuthenticated } from "../utils/auth";
// import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) {
      navigate("/questions");
    }
  }, [navigate]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://algorithmacebackend.onrender.com/api/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res && res.data.success) {
        // Store authentication data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Show success message
        toast.success(res.data.message);

        // Navigate to the desired location
        navigate(location.state || "/questions");
      } else {
        // Show error message if login fails
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container " style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn forgot-btn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
