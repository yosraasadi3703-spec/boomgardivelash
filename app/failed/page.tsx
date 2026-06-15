"use client";

import { useRouter } from "next/navigation";

export default function FailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-6">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">

        <div className="text-5xl mb-4">❌</div>

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          پرداخت ناموفق بود
        </h1>

        <p className="text-gray-600 mb-6">
          متأسفانه پرداخت انجام نشد یا لغو شد. لطفاً دوباره تلاش کنید.
        </p>

        <div className="flex gap-3 justify-center">

          <button
            onClick={() => router.push("/#reservation")}
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
          >
            تلاش دوباره
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 text-white px-5 py-3 rounded-xl hover:bg-gray-600 transition"
          >
            صفحه اصلی
          </button>

        </div>

      </div>
    </div>
  );
}