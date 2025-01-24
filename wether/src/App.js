import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchMap from "./components/SearchMap/SearchMap";

// حل مشكلة ال ref , userState في توقعات كل الاسبوع

function App() {
  const [wetherData, setWetherData] = useState({});
  const [mode, setMode] = useState(false);
  const [currMarker, setCurrMarker] = useState({});
  const currRef = useRef(null);

  function setNewMarkerAsMarker(Marker) {
    setCurrMarker(Marker);
    getCurrantWetherData(Marker);
    currRef.current = Marker;
  }

  useEffect(() => {
    console.log("ref");
    navigator.geolocation.getCurrentPosition((d) => {
      const pin = {
        lat: d.coords.latitude,
        lng: d.coords.longitude,
      };
      currRef.current = pin;
      setCurrMarker(pin);
      getCurrantWetherData(pin);
    });

    const modeData = JSON.parse(localStorage.getItem("settings"));
    setMode(modeData?.mode);
  }, []);

  async function getCurrantWetherData(Marker) {
    try {
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
    } catch (err) {
      console.log(err);
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
            element={
              currRef?.current && (
                <Main currMarker={currRef?.current} wetherData={wetherData} />
              )
            }
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
