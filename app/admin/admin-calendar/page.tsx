"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function AdminCalendarPage() {
  const [blockedDays, setBlockedDays] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("green");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [reason, setReason] = useState("");

  const rooms = [
    { key: "green", name: "گرین" },
    { key: "velash", name: "ولاش" },
    { key: "zz", name: "زز" },
    { key: "chinar", name: "چنار" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blocked-days");
      const data = await res.json();
      setBlockedDays(data);
    };

    fetchData();
  }, []);

  const handleBlockDay = async () => {
    if (!selectedDate) return;

    await fetch("/api/blocked-days", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: selectedRoom,
        date: selectedDate.toDate().toISOString(),
        reason,
      }),
    });

    alert("روز بسته شد");

    const res = await fetch("/api/blocked-days");
    setBlockedDays(await res.json());
  };

  const isBlocked = (date: any) => {
    const jsDate = new Date(date.toDate());
    jsDate.setHours(0, 0, 0, 0);

    return blockedDays.some((b) => {
      const d = new Date(b.date);
      d.setHours(0, 0, 0, 0);

      return (
        d.getTime() === jsDate.getTime() &&
        b.room === selectedRoom
      );
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        تقویم ادمین
      </h1>

      {/* انتخاب اتاق */}
      <select
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        {rooms.map((r) => (
          <option key={r.key} value={r.key}>
            {r.name}
          </option>
        ))}
      </select>

      {/* دیتاپیکر */}
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={selectedDate}
        onChange={setSelectedDate}
        mapDays={({ date }) => {
          if (isBlocked(date)) {
            return {
              disabled: true,
              style: {
                backgroundColor: "#ef4444",
                color: "white",
              },
            };
          }
        }}
      />

      <input
        className="border p-2 w-full mt-4"
        placeholder="دلیل (اختیاری)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button
        onClick={handleBlockDay}
        className="mt-4 w-full bg-black text-white p-3 rounded"
      >
        بستن روز انتخاب شده
      </button>
    </div>
  );
}