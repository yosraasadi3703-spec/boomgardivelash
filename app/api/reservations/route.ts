import { prisma } from "@/lib/prisma";

const ROOM_CAPACITY: Record<string, number> = {
  green: 7,
  velash: 7,
  zz: 7,
  chinar: 7,
};

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();
    return Response.json(reservations);
  } catch (err) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      room,
      name,
      phone,
      guests,
      check_in,
      check_out,
      extra_names,
    } = body;

    if (!room || !check_in || !check_out) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const capacity = ROOM_CAPACITY[room] || 7;

    const reservations = await prisma.reservation.findMany({
      where: { room },
    });

    const overlapping = reservations.filter((r) => {
      return (
        new Date(check_in) <= new Date(r.check_out) &&
        new Date(check_out) >= new Date(r.check_in)
      );
    });

    let totalGuests = 0;

    overlapping.forEach((r) => {
      totalGuests += r.guests || 0;
    });

    totalGuests += Number(guests || 1);

    if (totalGuests > capacity) {
      return Response.json(
        { success: false, error: "ظرفیت این اتاق پر است" },
        { status: 400 }
      );
    }

  const reservation = await prisma.reservation.create({
  data: {
    room: String(room),
    name: String(name),
    phone: String(phone),
    guests: Number(guests || 1),
    check_in: new Date(check_in),
    check_out: new Date(check_out),
    extra_names: Array.isArray(extra_names)
      ? extra_names.join(", ")
      : extra_names || "",
    status: "active",
  },
});

    return Response.json({ success: true, reservation });
  } catch (err) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}