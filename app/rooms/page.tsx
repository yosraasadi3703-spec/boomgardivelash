import Link from "next/link";

export default function RoomsPage() {
  const rooms = [
    {
      name: "اتاق گرین",
      image: "/rooms/green.jpg",
      capacity: 7,
    },
    {
      name: "اتاق ولاش",
      image: "/rooms/vlash.jpg",
      capacity: 7,
      
    },
    {
      name: "اتاق زز",
      image: "/rooms/zz.jpg",
      capacity: 7,
     
    },
    {
      name: "اتاق چنار",
      image: "/rooms/chenar.jpg",
      capacity: 7,
    
    },
  ];

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12">
        اتاق‌های اقامتگاه ولاش
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {rooms.map((room, i) => (
          <Link
            key={i}
            href={`/#reservation?room=${encodeURIComponent(room.name)}`}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer hover:scale-[1.02] transition">
              <img
                src={room.image}
                className="h-64 w-full object-cover"
              />

              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold">{room.name}</h2>
                
                <p className="text-sm text-gray-500">
                  ظرفیت: {room.capacity} نفر
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* رزرو مستقیم */}
      <div className="mt-16 text-center">
        <Link href="/#reservation">
          <button className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">
            همین الان رزرو کن!
          </button>
        </Link>
      </div>
    </div>
  );
}