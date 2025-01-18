import React from "react";
import "./NavBar.css";

import { FaSearch } from "react-icons/fa";

export default function NavBar() {
   return (
      <div className="nav-bar">
         <button>
            <FaSearch />
         </button>
      </div>
   );
}
