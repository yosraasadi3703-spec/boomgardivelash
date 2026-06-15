import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const data = {
    merchant_id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", // اینو بعداً از زرین‌پال می‌گیری
    amount,
    callback_url: "http://localhost:3000/api/verify",
    description: "رزرو اقامتگاه ولاش",
  };

  const response = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.data.code === 100) {
    return NextResponse.json({
      url: `https://www.zarinpal.com/pg/StartPay/${result.data.authority}`,
    });
  }

  return NextResponse.json({ error: "payment failed" }, { status: 400 });
}