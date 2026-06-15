import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { room, date } = body;

  if (!room || !date) {
    return Response.json(
      { success: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  await prisma.reservation.deleteMany({
    where: {
      room,
      check_in: new Date(date),
      status: "blocked",
    },
  });

  return Response.json({ success: true });
}