import type { Metadata } from "next";
import ClientLayout from "./layout.client";
import NextNProgress from "nextjs-progressbar";
import "./globals.css";

export const metadata = {
  title: "Quilly AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
