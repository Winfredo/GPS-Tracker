"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

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
  }, []);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center gap-7 items-center">
      <h2 className="text-[20px] font-bold md:hidden">
        Click on the map below.
      </h2>
      <div className="w-[80%] h-[20%] md:w-[49%] md:h-[50%] lg:w-[35%] lg:h-[50%] rounded-lg overflow-hidden relative group cursor-pointer">
        <Link href="/view" target="_blank" rel="noopener noreferrer">
          <div>
            <Image
              src="/images/map.jpeg"
              alt="Map"
              fill
              className="object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-gray-800 font-semibold text-lg">
                Click here to view map
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="w-[80%] md:w-[30%] md:h-[40%] lg:w-[17%] lg:h-[40%] flex flex-col items-left bg-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-10">
          <FaLocationDot className="inline-block" />
          GPS Tracker
        </h2>
        <p className="text-[20px] md:text-[23px] font-bold">Status</p>
        <p className="font-bold mb-5">
          {coords.lat && coords.lon ? "Online" : "Offline"}
        </p>
        {coords.lat && coords.lon ? (
          <div className="text-[20px]">
            <p className="font-bold md:text-[23px]">Latitude</p>
            <p>{coords.lat.toFixed(4)}</p>
            <p className="font-bold mt-5 md:text-[23px]">Longitude</p>
            <p>{coords.lon.toFixed(4)}</p>
          </div>
        ) : (
          <p>Obtaining location...</p>
        )}
      </div>
    </div>
  );
};

export default page;
