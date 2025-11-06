"use client";

import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface DataProps {
    hello?: string
}
export default function TestFirebase() {
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    const testFirestore = async () => {
      // Write sample data
      await setDoc(doc(db, "test", "ping"), { hello: "winfred" });

      // Read it back
      const snap = await getDoc(doc(db, "test", "ping"));
      if (snap.exists()) {
        setData(snap.data());
      }
    };

    testFirestore();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Firestore Test</h1>
      <p>{data ? JSON.stringify(data) : "Testing connection..."}</p>
    </div>
  );
}
