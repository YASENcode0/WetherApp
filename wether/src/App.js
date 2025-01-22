import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchMap from "./components/SearchMap/SearchMap";

// حل مشكلة ال ref , userState في توقعات كل الاسبوع

function App() {
  const [wetherData, setWetherData] = useState({});
  const [mode, setMode] = useState(false);
  const [currMarker, setCurrMarker] = useState({});

  function setNewMarkerAsMarker(Marker) {
    setCurrMarker(Marker);
    getCurrantWetherData(Marker);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((d) => {
      const pin = {
        lat: d.coords.latitude,
        lng: d.coords.longitude,
      };
      setCurrMarker(pin);
      getCurrantWetherData(pin);
    });

    const modeData = JSON.parse(localStorage.getItem("settings"));
    setMode(modeData?.mode);
  }, []);

  async function getCurrantWetherData(Marker) {
    console.log(Marker);
    const { data } = await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=c6c49a390bf340bea5465106251801&q=${Marker?.lat},${Marker?.lng}&aqi=yes`
      )
      .catch((err) => {
        console.log(err.message);
        return { data: 0 };
      });
    if (data) {
      setWetherData({
        location: data?.location,
        current: data?.current,
      });
    }
  }

  function modeSwitch() {
    setMode(!mode);
    const settings = {
      mode: !mode,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  }
  return (
    <Router>
      <title>The wether now</title>
      <div className={`App ${mode && "App-dark"}`}>
        <NavBar modeSwitch={modeSwitch} mode={mode} />
        <Routes>
          <Route
            path="/"
            element={<Main currMarker={currMarker} wetherData={wetherData} />}
          />
          <Route
            path="/map"
            element={
              <SearchMap
                setNewMarkerAsMarker={setNewMarkerAsMarker}
                currMarker={currMarker}
                setCurrMarker={setCurrMarker}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
