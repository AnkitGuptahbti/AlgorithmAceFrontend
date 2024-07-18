import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const HomePage = () => {

      const navigate = useNavigate();

    useEffect(() => {
        const auth = isAuthenticated();
        if (auth) {
            navigate("/questions");
        }
    }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(0deg, #a5ada6 0%, #0b5451 100%)",
        color: "#ffffff", // Set text color to white for better contrast
      }}
    >
      <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            width: "400px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            borderRadius: "8px", // Rounded corners
          }}
        >
          Register
        </div>
      </Link>
      <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            width: "400px",
            height: "200px",
            margin: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            borderRadius: "8px", // Rounded corners
          }}
        >
          Login
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
