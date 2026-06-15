"use client";

import { useEffect, useState } from "react";

export default function CalendarClient({
  reservations,
}: {
  reservations: any[];
}) {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<any>({ reservations: [], blocked: [] });
  const [room, setRoom] = useState("green");

  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const roomReservations = data.reservations.filter(
    (r: any) => r.room === room
  );

  const roomBlocked = data.blocked.filter((b: any) => b.room === room);

  const isBlocked = (dateStr: string) =>
    roomBlocked.some((b: any) => format(new Date(b.date)) === dateStr);

  const isReserved = (dateStr: string) =>
    roomReservations.some((r: any) => {
      const start = new Date(r.check_in);
      const end = new Date(r.check_out);
     const d = new Date(dateStr + "T12:00:00");
d.setHours(0, 0, 0, 0);
      return d >= start && d <= end;
    });

  return (
    <div className="p-6">

      {/* ROOMS */}
      <div className="flex gap-2 mb-4">
        {["green", "vlash", "zz", "chenar"].map((r) => (
          <button
            key={r}
            onClick={() => setRoom(r)}
            className={`px-3 py-1 rounded ${
              room === r ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = format(new Date(year, month, day));

          const blocked = isBlocked(dateStr);
          const reserved = isReserved(dateStr);

          return (
            <div
              key={i}
              className={`p-3 text-center border rounded cursor-pointer ${
                blocked
                  ? "bg-black text-white"
                  : reserved
                  ? "bg-red-500 text-white"
                  : "bg-green-200"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}