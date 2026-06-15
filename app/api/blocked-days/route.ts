export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blocked = await prisma.blockedDay.findMany();
    return Response.json(blocked);
  } catch (e) {
    return Response.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return Response.json({
      success: true,
    });
  } catch (e) {
    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}