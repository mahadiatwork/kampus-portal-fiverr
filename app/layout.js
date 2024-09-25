"use client"; // Ensure this is a client component

import { Suspense, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Loader from "@/components/common/Loader"; // Adjust path as needed
import "./globals.css";


export const metadata = {
  title: 'Portail KAMPUS RÉUNION | École en ligne pour tous',
  description: 'Plateforme en ligne pour tous les apprenants à la Réunion.',
};


export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // For managing transitions

  const navigateTo = (url) => {
    startTransition(() => {
      router.push(url); // This triggers the loading state automatically with useTransition
    });
  };

  return (
    <html lang="en">
      <head>
      <title>{metadata.title}</title> {/* Set the title */}
      <meta name="description" content={metadata.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {isPending && <Loader />} {/* Show loader when the transition is pending */}
        {pathname !== "/login" && <Navbar navigateTo={navigateTo} />}
        <Suspense fallback={<Loader />}>
        {children}
        </Suspense>

      </body>
    </html>
  );
}
