import React from "react";
import WetherNow from "../WetherNow/WetherNow";
import "./Main.css";

import { ImDroplet } from "react-icons/im";
import { LuWind } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";

export default function Main({ wetherData }) {
   console.log(wetherData);
   return (
      <div className="main">
         <WetherNow wetherData={wetherData} />
         <div className="main-box1">
            <div>
               <h3>humidity</h3>
               <h3>
                  <ImDroplet />
                  {wetherData?.current?.humidity}
               </h3>
            </div>
            <div>
               <h3>Wind</h3>
               <h3>
                  <LuWind />
                  {wetherData?.current?.wind_kph}
               </h3>
            </div>
            <div>
               <h3>Visibility</h3>
               <h3>
                  <MdVisibility />
                  {wetherData?.current?.vis_km}
               </h3>
            </div>
         </div>
         <div className="main-box2">
            <h2>The weak</h2>
            <div className="main-box3">
               <div className="day-label"></div>
               <div className="day-label"></div>
               <div className="day-label"></div>
               <div className="day-label"></div>
               <div className="day-label"></div>
               <div className="day-label"></div>
               <div className="day-label"></div>
            </div>
         </div>
      </div>
   );
}
