import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchMap from "./components/SearchMap/SearchMap";

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
      setCurrMarker(() => ({
        lat: d.coords.latitude,
        lng: d.coords.longitude,
      }));
      getCurrantWetherData(d.coords);
    });
    getCurrantWetherData();
    const modeData = JSON.parse(localStorage.getItem("settings"));
    setMode(modeData?.mode);
  }, []);

  /// fix the change current wether marker
  async function getCurrantWetherData(Marker) {
    const { data } = await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=c6c49a390bf340bea5465106251801&q=${
          currMarker?.lat || Marker?.latitude
        },${currMarker?.lng || Marker?.longitude}&aqi=yes`
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
      <div className={`App ${mode && "App-dark"}`}>
        <NavBar modeSwitch={modeSwitch} mode={mode} />
        <Routes>
          <Route path="/" element={<Main wetherData={wetherData} />} />
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

export const wetherIcons = [
  {
    name: "sunny",
    link: "https://cdn3d.iconscout.com/3d/premium/thumb/sunny-sun-3d-icon-download-in-png-blend-fbx-gltf-file-formats--day-sky-weather-pack-icons-5122320.png?f=webp",
  },
  {
    name: "moon",
    link: "https://cdn3d.iconscout.com/3d/premium/thumb/half-moon-and-star-weather-3d-icon-download-in-png-blend-fbx-gltf-file-formats--report-planet-astronomy-pack-nature-icons-8139251.png?f=webp",
  },
  {
    name: "cloudy",
    link: "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-3d-icon-download-in-png-blend-fbx-gltf-file-formats--nature-cloud-pack-icons-6328505.png?f=webp",
  },
  {
    name: "cloudy sunny",
    link: "https://static.vecteezy.com/system/resources/thumbnails/028/754/457/small_2x/sunny-weather-3d-icon-illustrations-png.png",
  },
  {
    name: "cloudy moon",
    link: "https://cdn3d.iconscout.com/3d/premium/thumb/cloud-with-crescent-moon-6378427-5283776.png?f=webp",
  },
  {
    name: "wind",
    link: "https://cdn3d.iconscout.com/3d/premium/thumb/wind-3d-icon-download-in-png-blend-fbx-gltf-file-formats--nature-forecast-sun-sky-weather-pack-icons-7412323.png",
  },
];
