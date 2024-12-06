import { NextResponse } from "next/server";

export async function GET() {
  const body = { remote_id: "12", username: "ninja" };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AVATARA_URl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: process.env.AVATARA_KEY!,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status == "error") {
      return NextResponse.json({ data: data.message, status: 400 });
    }
    const token = data.data.token;
    return NextResponse.json({ data: token, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
