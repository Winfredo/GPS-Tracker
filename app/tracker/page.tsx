"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaLocationDot } from "react-icons/fa6";
import Image from 'next/image'


type Coords ={
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
  }, []);

  return (
    <div className="w-full h-screen flex justify-center gap-7 items-center">
     <div className="w-[35%] h-[50%] rounded-lg overflow-hidden bg-white relative">
  <Image
    src="/images/map.jpeg"
    alt="Map"
    fill
    className="object-cover"
  />
</div>
      <div className="w-[17%] h-[40%]  flex flex-col items-left bg-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-16"><FaLocationDot className="inline-block" />GPS Tracker</h2>
        <p className="text-[20px]">Status</p>
        <p className="font-bold mb-5">{coords.lat && coords.lon ? "Online" : "Offline"}</p>
        {coords.lat && coords.lon ? (
          <div className="text-[20px]">
            <p className="font-bold">Latitude</p> <p>{coords.lat.toFixed(4)} </p>
            <p className="font-bold mt-5">Longitude</p> <p>{coords.lon.toFixed(4)}</p>
          </div>
        ) : (
          <p>Obtaining location...</p>
        )}
      </div>
    </div>
  );
};

export default page;
