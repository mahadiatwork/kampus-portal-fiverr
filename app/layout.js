// app/layout.js or any client component
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {
          pathname !== "/login" && <Navbar />
        }
        {children}
      </body>
    </html>
  );
}
