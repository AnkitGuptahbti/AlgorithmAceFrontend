import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { isAuthenticated } from "../utils/auth";

const Navbar = () => {
  const auth = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <h4 className="logo">Coding WEB</h4>

        {auth && (
          <button className="btnlogout" onClick={handleLogout}>
            <h4>Logout</h4>
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
