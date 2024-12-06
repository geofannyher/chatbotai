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
          Authorization: `Bearer ${data?.token}`,
          apiKey: process.env.AVATARA_KEY!,
        },
        body: JSON.stringify({ message: data.message }),
      }
    );

    const dataResponse = await response.json();

    return NextResponse.json(dataResponse, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
// export async function POST(req: Request) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token");
//   const data = await req.json();

//   const lastMessage =
//     data.messages && Array.isArray(data.messages)
//       ? data.messages[data.messages.length - 1]
//       : "";
//   try {
//     const response = await fetch(
//       `${process.env.AVATARA_URL}/metered/conversations/2pmPlrB9pby2XOA3Z5f7HEdBCsk/chat`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token?.value}`,
//           apiKey: process.env.AVATARA_KEY!,
//         },
//         body: JSON.stringify({ message: lastMessage.content }),
//       }
//     );

//     if (!response) {
//       throw new Error("API request failed");
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let result = "";

//     const stream = new ReadableStream({
//       start(controller) {
//         function push() {
//           reader.read().then(({ done, value }) => {
//             if (done) {
//               controller.close();
//               return;
//             }

//             result += decoder.decode(value, { stream: true });
//             controller.enqueue(value);
//             console.log(result);
//             push();
//           });
//         }

//         push();
//       },
//     });
//     return new NextResponse(stream, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// }
