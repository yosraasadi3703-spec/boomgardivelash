"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    const phone = localStorage.getItem("phone");

    setIsAdmin(admin === "true");
    setLoggedIn(!!phone);
  }, []);

  const goHome = () => {
    setOpen(false);
    router.push("/#hero");
  };

  const goTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const logout = () => {
    localStorage.removeItem("phone");
    localStorage.removeItem("isAdmin");

    setLoggedIn(false);
    setIsAdmin(false);

    setOpen(false);

    router.push("/");
  };

  return (
    <div className="fixed top-4 right-4 z-50">

      <button
        onClick={() => setOpen(!open)}
        className="bg-white shadow-md p-3 rounded-xl"
      >
        ☰
      </button>

      {open && (
        <div className="mt-2 bg-white shadow-xl rounded-xl p-4 w-52 flex flex-col gap-3 text-right">

          <button onClick={goHome}>خانه</button>

          <button onClick={() => goTo("/my-reservations")}>
            رزروهای من
          </button>

          <button onClick={() => goTo("/rooms")}>
            اتاق‌ها
          </button>

          <button
            onClick={() => {
              setOpen(false);
              router.push("/#contact");
            }}
          >
            ارتباط با ما
          </button>

          <button onClick={() => goTo("/rules")}>
            قوانین
          </button>

          <button
            onClick={() => {
              setOpen(false);
              router.push("/#licenses");
            }}
          >
            مجوزها
          </button>

          {!loggedIn && (
            <button
              onClick={() => goTo("/login")}
              className="text-green-700 font-bold"
            >
              ورود
            </button>
          )}

          {loggedIn && (
            <button
              onClick={logout}
              className="text-red-600 font-bold"
            >
              خروج
            </button>
          )}

          {isAdmin && (
            <>
            <button
  onClick={() => goTo("/admin/admin-calendar")}
  className="text-blue-600 font-bold"
>
  مدیریت تقویم
</button>

              <button
                onClick={() => goTo("/admin")}
                className="text-red-600 font-bold"
              >
                پنل ادمین
              </button>
            </>
          )}

        </div>
      )}

    </div>
  );
}