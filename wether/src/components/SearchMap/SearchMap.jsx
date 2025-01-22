import React, { useEffect, useState } from "react";
import "./SearchMap.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";

export default function SearchMap({
  currMarker,
  setCurrMarker,
  setNewMarkerAsMarker,
}) {
  const [search, setSearch] = useState("");
  const [newMarker, setNewMarker] = useState(currMarker);

  const navigate = useNavigate();

  function resetNewMarker() {
    setNewMarker(currMarker);
  }
  async function resetCurrMarker() {
    await navigator.geolocation.getCurrentPosition((d) => {
      const pin = {
        lat: d.coords.latitude,
        lng: d.coords.longitude,
      };
      setCurrMarker(pin);
      setNewMarker(pin);
    });
  }

  return (
    <APIProvider apiKey={"AIzaSyA_01vV-UG-8kyxW5K-IntxTPOHQURDsME"}>
      <div className="search-map">
        <div className="map">
          <Map
            onClick={(e) => {
              const latlng = e.detail.latLng;
              setNewMarker({ lat: latlng.lat, lng: latlng.lng });
            }}
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{
              lat: currMarker.lat,
              lng: currMarker.lng,
            }}
            defaultZoom={15}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapTypeId={"roadmap"}
          >
            <Marker
              position={{
                lat: newMarker?.lat || currMarker.lat,
                lng: newMarker?.lng || currMarker.lng,
              }}
            />
          </Map>
        </div>
        <input
          type="search"
          className="map-search-input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="map-search-tools">
          <button className="map-tools-btn-left" onClick={resetNewMarker}>
            <MdOutlineSettingsBackupRestore />
          </button>
          <div className="map-tools-btns">
            <button
              className="map-tools-btn-right"
              onClick={() => {
                setNewMarkerAsMarker(newMarker);
                navigate("/");
              }}
            >
              <MdAddLocationAlt />
            </button>
            <button onClick={resetCurrMarker}>
              <FaLocationCrosshairs />
            </button>
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
