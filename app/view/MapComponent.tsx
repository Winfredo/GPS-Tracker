"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/images/location.png",
  iconSize: [30, 30],
});

type Coords = { lat: number | null; lon: number | null };

export default function MapComponent() {
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
      <p className="text-center mt-8">Fetching location...</p>
    )}
  </div>
  );
}
