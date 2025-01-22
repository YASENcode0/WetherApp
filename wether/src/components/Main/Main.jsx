import React, { useEffect, useState } from "react";
import WetherNow from "../WetherNow/WetherNow";
import axios from "axios";
import "./Main.css";

import { wetherIcons } from "../../App";

import { ImDroplet } from "react-icons/im";
import { LuWind } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";

export default function Main({ wetherData, currMarker }) {
  const [weakData, setWeakData] = useState([]);
  useEffect(() => {
    getWeakData();
  }, []);

  async function getWeakData() {
    if (currMarker.lat) {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=c6c49a390bf340bea5465106251801&q=${currMarker?.lat},${currMarker?.lng}&aqi=yes&days=7`
      );
      setWeakData(data?.forecast?.forecastday);
    }
  }

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
            {wetherData?.current?.vis_km}km
          </h3>
        </div>
      </div>
      <div className="main-box2">
        <h2>The weak</h2>
        <div className="main-box3">
          {weakData?.map((day, i) => {
            return (
              <div key={i} className="day-label">
                <p>{i === 0 ? "Tody" : day?.date}</p>
                <p>{day?.day?.condition?.text}</p>
                <img src={day?.day?.condition?.icon} alt="wether" />
                <p>{day?.day?.maxtemp_c} c</p>
                <p>{day?.day?.mintemp_c} c</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
