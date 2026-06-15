import { prisma } from "@/lib/prisma";
import { toJalali, roomNames } from "@/lib/utils";

export default async function AdminPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        پنل مدیریت اقامتگاه
      </h1>

      <div className="grid gap-4">
        {reservations.map((r) => (
          <div key={r.id} className="border p-4 rounded-xl">
            <p>👤 نام: {r.name}</p>
            <p>📞 تلفن: {r.phone}</p>
            <p>🏠 اتاق: {roomNames[r.room] || r.room}</p>
            <p>👥 نفرات: {r.guests}</p>
            <p>📅 ورود: {toJalali(r.check_in)}</p>
            <p>📅 خروج: {toJalali(r.check_out)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}