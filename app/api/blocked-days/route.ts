export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json([]);
}

export async function POST() {
  return Response.json({ success: true });
}