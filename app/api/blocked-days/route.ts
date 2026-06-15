import { prisma } from "@/lib/prisma";

export async function GET() {
  const blocked = await prisma.reservation.findMany({
    where: {
      status: "blocked",
    },
  });

  return Response.json(blocked);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { room, date } = body;

  if (!room || !date) {
    return Response.json(
      { success: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  const blocked = await prisma.reservation.create({
    data: {
      room,
      name: "BLOCKED",
      phone: "000",
      guests: 0,
      check_in: new Date(date),
      check_out: new Date(date),
      extra_names: "",
      status: "blocked",
    },
  });

  return Response.json({
    success: true,
    blocked,
  });
}