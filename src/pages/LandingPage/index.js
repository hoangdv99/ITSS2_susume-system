import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  const onGetStart = () => {
    navigate("/login");
  };
  return (
    <div className="landing">
      <div className="landing-header">
        <div className="logo">
          <span>
            <b>STORE MANEGER</b>
          </span>
        </div>
        <div className="login-register">
          <div style={{ margin: "0 1rem" }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Login
            </Link>
          </div>
          <div style={{ margin: "0 1rem" }}>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
      <div className="landing-content">
        <div className="landing-content-des">
          Manage your store in a smart way
        </div>
        <button className="get-start" onClick={onGetStart}>
          Get Start
        </button>
      </div>
    </div>
  );
}
