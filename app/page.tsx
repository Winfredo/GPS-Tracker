"use client";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-linear-to-br from-[#f0f4ff] via-[#ffffff] to-[#e6f0ff]  flex flex-col items-center justify-center min-h-screen text-white">

      <div className="text-center px-6">
        <h1 className="text-2xl md:text-5xl font-bold mb-4 text-black">
        <Image
            src="/images/earth.png"
            alt="GPS Tracker Logo"
            width={60}
            height={60}
            className="inline-block mr-4"
          />
          Real-Time GPS Tracker
        </h1>
        <p className="text-sm md:text-lg text-gray-400 mb-8">
          Track your movement live and view it anywhere in real time.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/tracker"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
          >
            🚗 Go to Tracker
          </Link>
        </div>
      </div>
    </div>
  );
}

