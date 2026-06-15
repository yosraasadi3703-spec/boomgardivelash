"use client";

import { useEffect, useState } from "react";

export default function MyReservationsPage() {
  const [phone, setPhone] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [filter, setFilter] = useState("all");

  // فقط وقتی دکمه یا تغییر واقعی لازم بود اجرا میشه
  const fetchReservations = async () => {
    if (!phone || phone.length < 11) return;

    setLoading(true);

    try {
      const res = await fetch("/api/reservations");

      if (!res.ok) {
        console.log("API Error");
        return;
      }

      const data = await res.json();

      const filtered = data.filter((r: any) => {
        return String(r.phone).trim() === String(phone).trim();
      });

      setReservations(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ این useEffect رو کامل حذف کردم چون باعث باگ input میشد
  // useEffect(() => { ... }, [phone]);

  const handleCancelRequest = async (id: string) => {
    if (!cardNumber.trim()) {
      alert("شماره کارت وارد نشده");
      return;
    }

    const res = await fetch("/api/cancel-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reservationId: id,
        cardNumber,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("درخواست کنسلی ارسال شد");
      setCancelId(null);
      setCardNumber("");
    }
  };

  const getFiltered = () => {
    if (filter === "all") return reservations;
    return reservations.filter((r) => r.status === filter);
  };

  if (loading) return <p className="p-10">در حال بارگذاری...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* PHONE INPUT */}
      <div className="mb-6 border p-4 rounded-xl">
        <input
          type="tel"
          placeholder="شماره موبایل خود را وارد کنید"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={fetchReservations}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          جستجو
        </button>
      </div>

      {/* TITLE + FILTER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">رزروهای من</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">همه</option>
          <option value="active">فعال</option>
          <option value="pending_cancel">در انتظار کنسلی</option>
          <option value="canceled">کنسل شده</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {getFiltered().length === 0 ? (
        <p className="text-gray-500">رزروی یافت نشد</p>
      ) : (
        getFiltered().map((r) => (
          <div key={r.id} className="border p-4 rounded-xl mb-4">

            <div className="mb-2">
              <span className={`px-3 py-1 rounded text-white text-sm ${
                r.status === "active"
                  ? "bg-green-600"
                  : r.status === "pending_cancel"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}>
                {r.status}
              </span>
            </div>

            <p>🏠 اتاق: {r.room}</p>
            <p>👤 نام: {r.name}</p>
            <p>
              📅 ورود: {new Date(r.check_in).toLocaleDateString("fa-IR")}
            </p>
            <p>
              📅 خروج: {new Date(r.check_out).toLocaleDateString("fa-IR")}
            </p>

           {r.status === "active" && (
              <button
                onClick={() =>
                  setCancelId(cancelId === r.id ? null : r.id)
                }
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
              >
                درخواست کنسلی
              </button>
            )}

            {cancelId === r.id && (
              <div className="mt-3 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="شماره کارت بانکی"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="border p-2 rounded"
                />

                <button
                  onClick={() => handleCancelRequest(r.id)}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  تایید کنسلی
                </button>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}