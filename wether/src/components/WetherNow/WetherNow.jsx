import React, { useState } from "react";
import "./WetherNow.css";

export default function WetherNow({ wetherData }) {
   return (
      <div className="wether-box">
         <div className="wether-box1">
            <h1>{wetherData?.location?.name}</h1>
            <p>
               <span>{wetherData?.location?.name}</span>
               <span>{wetherData?.location?.region}</span>
               <span>{wetherData?.location?.localtime}</span>
            </p>
         </div>
         <div className="wether-box2">
            <div className="box1-1">
               <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/028/754/457/small_2x/sunny-weather-3d-icon-illustrations-png.png"
                  alt="wether"
               />
            </div>
            <div className="box1-2">
               <h2>
                  {wetherData?.tempC}
                  <span>C</span>
               </h2>
            </div>
         </div>
      </div>
   );
}
