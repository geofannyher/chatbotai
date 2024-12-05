import "./globals.css";
import { Metadata } from "next";
import { Mulish } from "next/font/google";
export const metadata: Metadata = {
  metadataBase: new URL("https://ai-sdk-preview-attachments.vercel.dev"),
  title: "Chatbot",
  description: "Chatbot",
};
const mullish = Mulish({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mullish.className}>{children}</body>
    </html>
  );
}
