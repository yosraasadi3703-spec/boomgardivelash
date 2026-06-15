import { prisma } from "@/lib/prisma";
import AdminUI from "./adminUI"; // ✅ حتماً همین

export default async function AdminPage() {
  const reservations = await prisma.reservation.findMany({
    where: {
      status: { not: "canceled" },
    },
    orderBy: { createdAt: "desc" },
  });

  const canceledReservations = await prisma.reservation.findMany({
    where: {
      status: "canceled",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminUI
      reservations={reservations}
      canceledReservations={canceledReservations}
    />
  );
}