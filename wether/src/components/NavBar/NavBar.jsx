import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import { FaSearch } from "react-icons/fa";

export default function NavBar({ modeSwitch, mode }) {
  const navigate = useNavigate();

  function backToHomePage() {
    if (window.location.pathname === "/map") {
      navigate("/");
    } else {
      navigate("/map");
    }
  }

  const pathName = window.location.pathname;

  return (
    <div className="nav-bar">
      <button className="nav-back" onClick={backToHomePage}>
        <div className={`nav-back-btn ${pathName !== "/map" && "hide"}`}>
          <IoIosArrowBack />
        </div>
        <div className={`nav-back-btn ${pathName !== "/" && "hide"}`}>
          <FaSearch />
        </div>
      </button>

      <button
        className={`switch-btn ${mode && "switch-btn-on"}`}
        onClick={modeSwitch}
      >
        <div
          className={`switch-btn-i ${
            mode ? "switch-btn-i-of" : "switch-btn-i-on"
          }`}
        ></div>
      </button>
    </div>
  );
}
