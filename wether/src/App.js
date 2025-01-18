import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
   const [wetherData, setWetherData] = useState({});
   const [lonLat, setLonLat] = useState({});

   useEffect(() => {
      getCurrantWetherData();
   }, []);

   async function getCurrantWetherData() {
      navigator.geolocation.getCurrentPosition(async (d) => {
         const { data } = await axios
            .get(
               `http://api.weatherapi.com/v1/current.json?key=c6c49a390bf340bea5465106251801&q=${d?.coords?.latitude},${d?.coords?.longitude}&aqi=yes`
            )
            .catch((err) => {
               console.log(err.message);
            });
         console.log(data);
         setWetherData({
            location: data?.location,
            current: data?.current,
         });
      });
   }

   return (
      <div className="App">
         <NavBar />
         <Main wetherData={wetherData} />
      </div>
   );
}

export default App;
