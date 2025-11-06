"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type Coords = {
  lat: number | null;
  lon: number | null;
};

const page = () => {
    const [coords, setCoords] = useState<Coords>({ lat: null, lon: null });

useEffect(() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this device");
    return;
  }

  const updateLoc = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });

        await setDoc(doc(db, "locations", "device"), {
          lat: latitude,
          lon: longitude,
          timestamp: new Date(),
        });
      },
      (error) => {
        console.error("Error obtaining location", error);
      }
    );
  };
  updateLoc();

  const interval = setInterval(updateLoc, 5000);
  return () => clearInterval(interval);
},[]);
    
  return (
    <div>
        <h2>GPS Tracker</h2>
        {
            coords.lat && coords.lon ? (
                <>
                <p>Latitude: {coords.lat.toFixed(4)} </p>
                <p> Longitude: {coords.lon.toFixed(4)}</p>
                </>
            ) : (
                <p>Obtaining location...</p>
            )
        }
    </div>
  )
};

export default page;
