"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import dynamic from "next/dynamic";

// Dynamic import with no SSR for Leaflet map component
const LiveMap = dynamic(() => import("../components/liveMap"), {
  ssr: false,
});

export default function Home() {
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    socketRef.current = io(`${process.env.BASEBACKEND_URL}`);

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Socket disconnected");
    });

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const user = JSON.parse(localStorage.getItem("User"));

        if (user && socketRef.current) {
          socketRef.current.emit("user-location", {
            latitude: lat,
            longitude: lng,
            userId: user || user,
          });
          console.log("📡 Emitted location:", lat, lng);

          setPosition([lat, lng]);
        }
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>
        Home - Sending Location{" "}
        {isConnected ? "✅ Connected" : "❌ Disconnected"}
      </h1>
      <p>Your location is being sent in real-time to the server.</p>

      {!position && <p>Waiting for location...</p>}

      {position && <LiveMap position={position} />}
    </div>
  );
}
