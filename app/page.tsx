"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import moment from "jalali-moment";
import Link from "next/link";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

/* HERO IMAGES */
import { useEffect, useState, useMemo } from "react";

const images = ["/hero1.jpg", "/hero2.jpg"];


/* GALLERY IMAGES */
const gallery = [
  "/view/view1.jpg",
  "/view/view2.jpg",
  "/view/view3.jpg",
  "/view/view4.jpg",
  "/view/view5.jpg",
  "/view/view6.jpg",
  "/view/view7.jpg",
  "/people/people1.jpg",
  "/people/people2.jpg",
  "/people/people3.jpg",
  "/people/people4.jpg",
  "/people/people5.jpg",
  "/people/people6.jpg",
  "/people/people7.jpg",
  "/food/food1.jpg",
  "/food/food2.jpg",
  "/food/food3.jpg",
  "/food/food4.jpg",
  "/food/food5.jpg",
  "/food/food6.jpg",
  "/food/food7.jpg",
];
export default function Home (){
const [isAdmin, setIsAdmin] = useState(false);
const handleReservation = async () => {
  try {
    if (!checkIn || !checkOut) {
      alert("تاریخ ورود و خروج انتخاب نشده");
      return;
    }

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  body: JSON.stringify({
  room: selectedRoom,
  name,
  phone,
  guests,
 check_in: checkIn?.toDate().toISOString(),
check_out: checkOut?.toISOString(),

  extra_names: extraNames,
}),
    });

    if (res.ok) {
      alert("رزرو با موفقیت ثبت شد 🎉");
    } else {
      alert("خطا در ثبت رزرو");
    }
  } catch (err) {
    console.log(err);
    alert("خطا در ثبت رزرو");
  }
};
const [selectedRoom, setSelectedRoom] = useState("green");
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const searchParams = useSearchParams();
const roomFromUrl = searchParams.get("room");
const router = useRouter();
  const [guests, setGuests] = useState(1);
const [index, setIndex] = useState<number>(0);
const [extraNames, setExtraNames] = useState<string[]>([]);
const updateExtraName = (value: string, index: number) => {
  const updated = [...extraNames];
  updated[index] = value;
  setExtraNames(updated);
};

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("گرین");
  const [checkIn, setCheckIn] = useState<any>(null);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const isFormValid =
  name.trim() !== "" &&
  phone.length === 11 &&
  extraNames.every((n) => n.trim() !== "") &&
  acceptedRules === true;
const [nightsCount, setNightsCount] = useState(1);
const checkOut = useMemo(() => {
  if (!checkIn) return null;

  const baseDate =
    checkIn?.toDate ? checkIn.toDate() : new Date(checkIn);

  const date = new Date(baseDate);
  date.setDate(date.getDate() + nightsCount);

  return date;
}, [checkIn, nightsCount]);

  

  const [reservedRanges, setReservedRanges] = useState<
  { room: string; start: string; end: string }[]
>([]);

const [blockedDays, setBlockedDays] = useState<any[]>([]);
  const pricePerPersonPerNight = 850000;




const totalPrice =
  guests * nightsCount * pricePerPersonPerNight;
const bookedDays = [];

reservedRanges.forEach((range) => {
  const start = new Date(range.start);
  const end = new Date(range.end);

  let current = new Date(start);

  while (current <= end) {
    bookedDays.push(current.getDate());
    current.setDate(current.getDate() + 1);
  }
});


  /* CHECK BOOKED DAY */
  const isDayBooked = (day: number) => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), day);

    return reservedRanges.some((r) => {
      const start = new Date(r.start);
      const end = new Date(r.end);
      return date >= start && date <= end;
    });
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };

  /* HERO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* FETCH RESERVATIONS */
 useEffect(() => {
  const fetchReservations = async () => {
    const admin =
  typeof window !== "undefined" &&
  localStorage.getItem("isAdmin") === "true";

setIsAdmin(admin);
    const res = await fetch("/api/reservations");
   let data = [];

try {
  data = await res.json();
} catch (e) {
  console.log("API Error", e);
  return;
}

  const formatted = data.map((r: any) => {
  const start = new Date(r.check_in);
  const end = new Date(r.check_out);

  // جلوگیری از shift شدن تاریخ
  start.setHours(12, 0, 0, 0);
  end.setHours(12, 0, 0, 0);

  return {
    room: r.room,
    start: start.toISOString(),
    end: end.toISOString(),
  };
});

    setReservedRanges(formatted);
    const res2 = await fetch("/api/blocked-days");
const blocked = await res2.json();
setBlockedDays(blocked);
    try {
  const blockedRes = await fetch("/api/calendar");
  const blockedData = await blockedRes.json();

  setBlockedDays(blockedData);
} catch {}
  };

  fetchReservations();
}, []);
useEffect(() => {
  const count = guests - 1;

  if (count <= 0) {
    setExtraNames([]);
    return;
  }

  setExtraNames(Array(count).fill(""));
}, [guests]);

useEffect(() => {
  if (roomFromUrl) {
    setSelectedRoom(roomFromUrl);

    // بعد از لود صفحه برو روی رزرو
    setTimeout(() => {
      document
        .getElementById("reservation")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}, [roomFromUrl]);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-5">
<img
  src="/logo.png"
  alt="لوگوی اقامتگاه ولاش"
  className="w-32 h-32 mb-6 object-cover rounded-full border-4 border-white shadow-xl"
/>
          <h1 className="text-5xl md:text-7xl font-bold">
            اقامتگاه بومگردی ولاش
          </h1>

          <p className="mt-5 text-lg md:text-2xl">
            تجربه آرامش در دل طبیعت لرستان
          </p>

          <button
            onClick={() =>
              document.getElementById("reservation")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-8 rounded-2xl bg-green-600 px-8 py-4 text-lg hover:bg-green-700 transition"
          >
            رزرو اقامت
          </button>

          <Link
            href="/rooms"
            className="mt-4 inline-block bg-white text-black px-6py-3 rounded-xl"
          >
            مشاهده اتاق‌ها
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#F7F3EA] py-20 px-5 md:py-24 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              درباره اقامتگاه ولاش
            </h2>

           <p className="text-gray-700 leading-9">
قله ولاش یکی از شناخته‌شده‌ترین ارتفاعات منطقه الشتر در استان لرستان است که از گذشته جایگاه ویژه‌ای در میان مردم این منطقه داشته است. نام «ولاش» در فرهنگ محلی یادآور طبیعت بکر، چشم‌اندازهای کوهستانی و تاریخ کهن این سرزمین است.
</p>

<p className="text-gray-700 leading-9">
این منطقه به دلیل آب‌وهوای مطبوع، مراتع سرسبز و چشم‌اندازهای طبیعی، همواره مقصدی برای طبیعت‌گردان و علاقه‌مندان به آرامش بوده است.
</p>

<p className="text-gray-700 leading-9">
اقامتگاه بومگردی ولاش با الهام از همین طبیعت و هویت محلی شکل گرفته تا تجربه‌ای اصیل از مهمان‌نوازی لرستان و آرامش دامنه‌های ولاش را برای مهمانان خود فراهم کند.
</p>
          </div>

          <img
            src="/about.jpg"
            className="rounded-3xl shadow-xl w-full h-[320px] md:h-[450px] object-cover"
          />
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            گالری تصاویر
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => {
                  setPhotoIndex(i);
                  setOpen(true);
                }}
                className="rounded-2xl h-48 w-full object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION */}
<section id="reservation" className="py-24 px-6 bg-[#F7F3EA]">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">
      رزرو اقامتگاه
    </h2>

    {/* FORM */}
    <div className="grid md:grid-cols-2 gap-6">
<select
  value={selectedRoom}
  onChange={(e) => setSelectedRoom(e.target.value)}
  className="p-4 border rounded-xl md:col-span-2"
>
  <option value="green">گرین</option>
  <option value="velash">ولاش</option>
  <option value="zz">زز</option>
  <option value="chinar">چنار</option>
</select>
<button
  onClick={() => router.push("/rooms")}
  className="mt-3 px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition text-gray-700 font-medium"
>
  نمایش اتاق‌ها
</button>
      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-4 border rounded-xl md:col-span-2"
      />
 {extraNames.map((_, index) => (
  <input
    key={index}
    type="text"
    placeholder={`نام نفر ${index + 2}`}
    value={extraNames[index] || ""}
    onChange={(e) => updateExtraName(e.target.value, index)}
    className="p-4 border rounded-xl md:col-span-2 mt-2"
  />
))}
      <input
  type="tel"
  placeholder="شماره تماس"
  value={phone}
  onChange={(e) => {
  const val = e.target.value.replace(/[^0-9]/g, "");

  if (val.length > 11) {
    alert("شماره تماس نباید بیشتر از ۱۱ رقم باشد");
    return;
  }

  setPhone(val);
}}
  className="p-4 border rounded-xl md:col-span-2"
/>
<p className="text-center text-sm text-gray-600 md:col-span-2">
تعداد نفرات
</p>
<input
  type="number"
  min={1}
  max={7}
  value={guests}
  onChange={(e) => setGuests(Number(e.target.value))}
  className="p-4 border rounded-xl md:col-span-2"
/>
      <div className="md:col-span-2">
  <label className="block mb-2 font-bold">
    تعداد شب اقامت
  </label>

 <input
  type="number"
  min={1}
  max={30}
  value={nightsCount}
  onChange={(e) =>
    setNightsCount(Math.max(1, Number(e.target.value)))
  }
  className="p-4 border rounded-xl w-full"
/>

<DatePicker
  value={checkIn}
  onChange={(val) => setCheckIn(val)}
  calendar={persian}
  locale={persian_fa}
  mapDays={({ date }) => {
    const jsDate = new Date(date.toDate());
    jsDate.setHours(0, 0, 0, 0);

    const isBooked = reservedRanges.some((r) => {
      const start = new Date(r.start);
      const end = new Date(r.end);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return jsDate >= start && jsDate <= end;
    });

    const isBlocked = blockedDays.some((b: any) => {
      const d = new Date(b.date);
      d.setHours(0, 0, 0, 0);

      return (
        d.getTime() === jsDate.getTime() &&
        b.room === selectedRoom
      );
    });

    if (isBooked || isBlocked) {
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
</div>
<div className="mt-4 text-center font-bold text-green-700">
 مبلغ قابل پرداخت :{totalPrice.toLocaleString("fa-IR")} تومان
</div>
    </div>

 
         
       
      
    </div>
{/* RULES CHECK */}
<div className="mt-6 flex flex-col gap-3">

  <a href="/rules" className="text-blue-600 underline text-sm">
    مشاهده قوانین و مقررات
  </a>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={acceptedRules}
      onChange={(e) => setAcceptedRules(e.target.checked)}
    />
    قوانین و مقررات را می‌پذیرم
  </label>

</div>

{/* PAY BUTTON */}
<button
  disabled={!isFormValid}
  onClick={handleReservation}
  className={`w-full p-4 rounded-xl font-bold transition ${
    isFormValid
      ? "bg-green-600 text-white"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
>
  ثبت و پرداخت
</button>
    {/* INFO + MAP */}
    <div className="grid md:grid-cols-2 gap-8 mt-8">

      {/* INFO */}
      <div id="contact" className="bg-stone-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">
         ارتباط با ما
        </h3>

        <p className="mb-4">
          <strong>مدیریت:</strong> حمید قیطوری
        </p>

        <p className="mb-4">
          <strong>تلفن:</strong>{" "}
          <a href="tel:09165631143" className="text-green-700">
            09165631143
          </a>
        </p>

        <p className="mb-4">
          <strong>اینستاگرام:</strong>{" "}
          <a
            href="https://instagram.com/Bomgardi_vlash"
            target="_blank"
            className="text-pink-600"
          >
            @Bomgardi_vlash
          </a>
        </p>

        <p>
          <strong>آدرس:</strong> الشتر - روستای پرسک سفلی (خسروآباد)
        </p>
      </div>

      {/* MAP */}
      <div className="bg-stone-100 rounded-2xl p-8 flex items-center justify-center">
        <p className="text-center text-gray-600">
          در مرحله بعد نقشه گوگل اینجا قرار می‌گیرد.
        </p>
      </div>

    </div>
  
</section>

{/* LICENSE */}
<section id="licenses" className="py-24 px-6 bg-[#F7F3EA]">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl font-bold text-center mb-12">
      مجوزها و مدارک اقامتگاه
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <img src="/licenses/license1.jpg" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
      <img src="/licenses/license2.jpg" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
      <img src="/licenses/license3.jpg" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
    <img src="/licenses/license4.jpg" className="rounded-2xl shadow-lg w-full h-80 object-cover" />
    
    
    </div>

    <p className="text-center mt-8 text-gray-600">
      تمامی مجوزهای فعالیت اقامتگاه مطابق ضوابط وزارت میراث فرهنگی،
      گردشگری و صنایع دستی اخذ شده است.
    </p>

  </div>
</section>

{/* RULES */}
<section id="rules" className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl font-bold text-center mb-12">
      قوانین اقامتگاه
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="p-6 rounded-2xl bg-stone-100">
        ⏰ ساعت ورود: 16:00
      </div>

      <div className="p-6 rounded-2xl bg-stone-100">
        ⏰ ساعت خروج: 14:00
      </div>

      <div className="p-6 rounded-2xl bg-stone-100">
        🐶 ورود حیوانات خانگی: درصورت هماهنگی
      </div>

      <div className="p-6 rounded-2xl bg-stone-100">
        🚬 استعمال دخانیات: در محل تعیین شده 
      </div>
 <div className="p-6 rounded-2xl bg-stone-100 md:col-span-2">
       ورود زوجین همراه با مدرک زوجیت
      </div>
      <div className="p-6 rounded-2xl bg-stone-100 md:col-span-2">
        🎉 برگزاری مراسم با مجوز رسمی امکان‌پذیر است
      </div>

    </div>

  </div>
</section>

{/* FOOTER */}
<footer className="bg-gray-900 text-white p-10 text-center">
  اقامتگاه بومگردی ولاش
</footer>

{/* FLOAT BUTTONS */}
<div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
  <a
    href="tel:09165631143"
    className="bg-green-600 text-white px-4 py-3 rounded-full"
  >
    تماس
  </a>

  <a
    href="https://instagram.com/Bomgardi_vlash"
    target="_blank"
    className="bg-pink-600 text-white px-4 py-3 rounded-full"
  >
    اینستاگرام
  </a>
  
</div>
</>
  );}
