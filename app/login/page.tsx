"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

const handleLogin = () => {
  localStorage.setItem("phone", phone);

  if (phone === "09165631143") {
    localStorage.setItem("isAdmin", "true");
  }

  window.location.href = "/";
};

  return (
    <div className="max-w-md mx-auto p-8">

      <h1 className="text-2xl font-bold mb-6">
        ورود
      </h1>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="شماره موبایل"
        className="border p-3 rounded w-full"
      />

      <button
        onClick={handleLogin}
        className="mt-4 bg-black text-white px-6 py-3 rounded"
      >
        ورود
      </button>

    </div>
  );
}