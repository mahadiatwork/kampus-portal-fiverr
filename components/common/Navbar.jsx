"use client"; // Make this a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu toggle
import logo from "../../public/assets/Kampus logo.png";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const result = await res.json();
      console.log({ result });
      if (result.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="shadow flex items-center justify-between bg-[#623CEA] p-4">
      <div className="flex items-center space-x-4">
        {/* Logo or Brand */}
        <div className="text-xl font-bold text-blue-600">
          <Image
            src={logo} // Path relative to the public directory
            alt="Kampus Logo"
            width={150} // Desired width of the image
            height={75} // Desired height of the image
            priority // Optional: if you want to prioritize loading of this image
          />
        </div>

        {/* Desktop Navbar Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              href="/profile"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Profile
            </Link>
          </li>
          <li>
            <Link href="/jobs" className="text-white hover:text-[#FFCF56]">
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/applications"
              className="text-white hover:text-[#FFCF56]"
            >
              My Applications
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-[#FFCF56]">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle Mobile Menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Navbar Links */}
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-[#623CEA] flex flex-col items-center space-y-4 py-4 md:hidden">
          <li>
            <Link
              href="/profile"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/applications"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              My Applications
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full text-center"
            >
              Log Out
            </button>
          </li>
        </ul>
      )}

      {/* Logout Button (Desktop) */}
      <button
        onClick={handleLogout}
        className="hidden md:block ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </nav>
  );
}
