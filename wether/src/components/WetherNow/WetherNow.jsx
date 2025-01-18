import React, { useState } from "react";
import "./WetherNow.css";
import { wetherIcons } from "../../App";

export default function WetherNow({ wetherData }) {
  console.log(wetherData?.current);

  function getCurrentImg() {
    const img = wetherIcons.filter((i) => {
      return i.name === "moon" && i.link;
    });

    return img[0].link;
  }

  return (
    <div className="wether-box">
      <div className="wether-box1">
        <h1>{wetherData?.location?.name}</h1>
        <p>
          <span>{wetherData?.location?.country}</span>
          <span>{wetherData?.location?.region}</span>
          <span>{wetherData?.location?.localtime}</span>
        </p>
      </div>
      <div className="wether-box2">
        <div className="box1-1">
          <img src={getCurrentImg()} alt="wether" />
        </div>
        <div className="box1-2">
          <h2>
            {wetherData?.current?.temp_c}
            <span>C</span>
          </h2>
          <h3>{wetherData?.current?.condition?.text}</h3>
        </div>
      </div>
    </div>
  );
}
