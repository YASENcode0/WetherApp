import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
   const [wetherData, setWetherData] = useState({});

   useEffect(() => {
      getCurrantWetherData();
   }, []);

   async function getCurrantWetherData() {
      const { data } = await axios.get(
         "http://api.weatherapi.com/v1/current.json?key=c6c49a390bf340bea5465106251801&q=31.2615081,34.8320866&aqi=yes"
      );
      console.log(data);
      setWetherData({
         location: data?.location,
         tempC: data?.current?.temp_c,
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
