import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId, cardNumber } = body;

    if (!reservationId) {
      return Response.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "pending_cancel",
      },
    });

    console.log("Cancel request card:", cardNumber);

    return Response.json({
      success: true,
      reservation: updated,
    });
  } catch (err) {
    console.log(err);

    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}