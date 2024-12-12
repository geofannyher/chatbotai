import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AVATARA_URl}/metered/conversations/2pmPlrB9pby2XOA3Z5f7HEdBCsk/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${data?.token}`,
          apiKey: process.env.AVATARA_KEY!,
        },
        body: JSON.stringify({ message: data.message }),
      }
    );

    const dataResponse = await response.json();

    return NextResponse.json(dataResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
