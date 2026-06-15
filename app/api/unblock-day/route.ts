import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { room, date } = body;

  await prisma.reservation.deleteMany({
    where: {
      room,
      status: "blocked",
      check_in: new Date(date),
    },
  });

  return Response.json({ success: true });
}