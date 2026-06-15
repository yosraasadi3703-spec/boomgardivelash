"use client";

import { useState } from "react";
import { toJalali, roomNames } from "@/lib/utils";

export default function AdminClient({
  reservations,
  canceledReservations,
}: any) {
  const [tab, setTab] = useState<"reservations" | "canceled">("reservations");

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        پنل مدیریت اقامتگاه
      </h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setTab("reservations")}
          className={`px-4 py-2 rounded ${
            tab === "reservations"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          رزروها
        </button>

        <button
          onClick={() => setTab("canceled")}
          className={`px-4 py-2 rounded ${
            tab === "canceled"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          کنسلی‌ها
        </button>

      </div>

      {/* RESERVATIONS */}
      {tab === "reservations" && (
        <div className="grid gap-4">
          {reservations?.map((r: any) => (
            <div key={r.id} className="border p-4 rounded-xl">
              <p>👤 {r.name}</p>
              <p>📞 {r.phone}</p>
              <p>🏠 {roomNames[r.room] || r.room}</p>
              <p>👥 {r.guests}</p>
              <p>📅 {toJalali(r.check_in)}</p>
              <p>📅 {toJalali(r.check_out)}</p>
            </div>
          ))}
        </div>
      )}

      {/* CANCELED */}
      {tab === "canceled" && (
        <div className="grid gap-4">
          {canceledReservations?.map((r: any) => (
            <div key={r.id} className="border p-4 rounded-xl bg-red-50">
              <p>👤 {r.name}</p>
              <p>📞 {r.phone}</p>
              <p>🏠 {roomNames[r.room] || r.room}</p>
              <p>👥 {r.guests}</p>
              <p>📅 {toJalali(r.check_in)}</p>
              <p>📅 {toJalali(r.check_out)}</p>

              <span className="text-red-600 font-bold">
                کنسلی
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}