import React from "react";
import "./NavBar.css";

import { FaSearch } from "react-icons/fa";

export default function NavBar({ modeSwitch, mode }) {
  return (
    <div className="nav-bar">
      <button>
        <FaSearch />
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
