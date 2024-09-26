"use client"; // Make this a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu toggle
import logo from "../../public/assets/Kampus logo.png";

export default function Navbar({ isLoggedIn }) {
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
      console.error("La déconnexion a échoué", error);
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
            alt="Logo Kampus"
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
              Profil
            </Link>
          </li>
          <li>
            <Link href="/jobs" className="text-white hover:text-[#FFCF56]">
              Offres d'emploi
            </Link>
          </li>
          <li>
            <Link
              href="/applications"
              className="text-white hover:text-[#FFCF56]"
            >
              Mes candidatures
            </Link>
          </li>
          <li>
            <Link href="/services" className="text-white hover:text-[#FFCF56]">
              Nos prestations
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={toggleMobileMenu}
        aria-label="Ouvrir le menu mobile"
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
              Profil
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Offres d'emploi
            </Link>
          </li>
          <li>
            <Link
              href="/applications"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Mes candidatures
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-white hover:text-[#FFCF56]"
              onClick={toggleMobileMenu} // Close menu on click
            >
              Nos prestations
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full text-center"
              >
                Se déconnecter
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#FFCF56] px-4 py-2 rounded hover:text-white w-full text-center"
                onClick={toggleMobileMenu}
              >
                Se connecter
              </Link>
            )}
          </li>
        </ul>
      )}

      {/* Login/Logout Button (Desktop) */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="hidden md:block ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      ) : (
        <Link
          href="/login"
          className="hidden md:block ml-auto bg-[#FFCF56] px-4 py-2 rounded hover:text-white"
        >
          Se connecter
        </Link>
      )}
    </nav>
  );
}
