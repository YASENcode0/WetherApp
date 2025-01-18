import React from "react";
import WetherNow from "../WetherNow/WetherNow";
import "./Main.css";

export default function Main({wetherData}) {
   return (
      <div className="main">
         <WetherNow wetherData={wetherData}/>
         0
      </div>
   );
}
