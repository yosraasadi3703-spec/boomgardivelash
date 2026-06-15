import { prisma } from "@/lib/prisma";

export async function GET() {
  const blocked = await prisma.blockedDay.findMany();

  return Response.json(blocked);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { room, date, reason } = body;

  const blocked = await prisma.blockedDay.create({
    data: {
      room,
      date: new Date(date),
      reason,
    },
  });

  return Response.json({
    success: true,
    blocked,
  });
}