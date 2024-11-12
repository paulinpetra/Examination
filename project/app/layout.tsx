import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yum Yum Gim Mie Sum Foodtruck",
  description: "Foodtruck ordering system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
