"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Coords = {
  lat: number | null;
  lon: number | null;
};

const icon = L.icon({
  iconUrl: "/images/location.png",
  iconSize: [30, 30],
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function Page() {
  const [coords, setCoords] = useState<Coords>({ lat: null, lon: null });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "locations", "device"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setCoords({ lat: data.lat, lon: data.lon });
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="h-screen">
      {coords.lat && coords.lon ? (
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={[coords.lat, coords.lon]} icon={icon}>
            <Popup>Live Location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-lg">
          Loading map...
        </div>
      )}
    </div>
  );
}
