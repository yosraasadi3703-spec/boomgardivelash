import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const response = await fetch("https://sandbox.zarinpal.com/pg/v4/payment/request.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchant_id: "XXXX-XXXX-XXXX",
      amount,
      callback_url: "http://localhost:3000",
      description: "رزرو اقامتگاه",
    }),
  });

  const data = await response.json();

  const url = `https://sandbox.zarinpal.com/pg/StartPay/${data.data.authority}`;

  return NextResponse.json({ url });
}