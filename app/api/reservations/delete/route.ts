import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await prisma.reservation.delete({
      where: { id: body.id },
    });

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);
    return Response.json({ success: false });
  }
}