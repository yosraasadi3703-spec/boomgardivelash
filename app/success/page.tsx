"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // اگر خواستی بعد چند ثانیه برگرده صفحه اصلی
    // setTimeout(() => router.push("/"), 5000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-6">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">

        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-2xl font-bold text-green-700 mb-4">
          پرداخت موفق بود
        </h1>

        <p className="text-gray-600 mb-6">
          رزرو شما با موفقیت ثبت شد. برای هماهنگی با شما تماس گرفته می‌شود.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          بازگشت به صفحه اصلی
        </button>

      </div>
    </div>
  );
}