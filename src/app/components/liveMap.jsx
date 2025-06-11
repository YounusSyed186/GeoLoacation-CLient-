"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/loca.png", // public/loca.png
  iconUrl: "/loca.png",       // public/loca.png
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Recenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

export default function LiveMap({ position }) {
  if (!position) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Your current location</Popup>
      </Marker>
      <Recenter lat={position[0]} lng={position[1]} />
    </MapContainer>
  );
}
