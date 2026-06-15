import { prisma } from "@/lib/prisma";
import CalendarClient from "../calendar/CalendarClient";

export default async function Page() {
  const reservations = await prisma.reservation.findMany();

  return (
    <CalendarClient reservations={reservations} />
  );
}
