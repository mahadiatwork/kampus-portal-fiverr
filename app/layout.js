"use client"; // Ensure this is a client component

import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Loader from "@/components/common/Loader"; // Adjust path as needed
import "./globals.css";
import Cookies from "js-cookie"; // Add this to manage cookies

const metadata = {
  title: 'Portail KAMPUS RÉUNION | École en ligne pour tous',
  description: 'Plateforme en ligne pour tous les apprenants à la Réunion.',
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const [isPending, startTransition] = useState(false); // For managing transitions
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if user is logged in

  useEffect(() => {
    // Check if the user is logged in by verifying if the JWT token exists
    const token = Cookies.get("token"); // Using cookies to check JWT
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, [pathname]); // Re-check when the route changes

  const navigateTo = (url) => {
    startTransition(true); // Trigger loading state
    router.push(url); // Navigate to the desired URL
    startTransition(false); // End loading state
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {isPending && <Loader />} {/* Show loader when the transition is pending */}
        {pathname !== "/login" && pathname !== "/forgotpassword" && (
          <Navbar isLoggedIn={isLoggedIn} />
        )}
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}
