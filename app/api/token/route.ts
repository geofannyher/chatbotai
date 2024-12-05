import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("token");
  if (token?.value) {
    return NextResponse.json({ data: "sudah login" });
  } else {
    const username = "ninja";
    const body = { remote_id: "12", username: username };
    try {
      const res = await fetch(`${process.env.AVATARA_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: process.env.AVATARA_KEY!,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const cookieStore = cookies();
      if (data.status == "error") {
        return NextResponse.json({ data: data.message, status: 400 });
      }
      const token = data.data.token;
      cookieStore.set("token", token);
      return NextResponse.json({ data: token, status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error, status: 500 });
    }
  }
}
