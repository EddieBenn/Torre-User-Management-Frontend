"use client";

import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Menu } from "@mui/icons-material";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`px-4 lg:px-[7rem] relative z-50 flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
        isMenuOpen ? "h-[50vh]" : ""
      }`}
    >
      <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white transition-colors duration-300 ease-in-out">
        <Link href="/">Torre</Link>
      </h1>

      <button onClick={toggleMenu} className="lg:hidden p-2 focus:outline-none">
        <Menu className="text-gray-800 dark:text-white" />
      </button>

      <div
        className={`flex lg:items-center lg:flex-row flex-col space-y-2 lg:justify-end lg:space-x-4 
          ${
            isMenuOpen
              ? "fixed inset-0 bg-white dark:bg-gray-700 p-4 transition-transform duration-300 ease-out transform translate-x-0"
              : "fixed -translate-x-full ml-[-4rem] transition-transform duration-300 ease-in"
          } 
          lg:translate-x-0 lg:relative lg:bg-transparent lg:p-0 lg:flex lg:flex-row`}
      >
        <button
          onClick={toggleMenu}
          className="lg:hidden absolute top-4 right-4 text-gray-800 dark:text-white p-2 focus:outline-none"
        >
          ✕
        </button>

        <ThemeToggle />

        <div className="flex flex-col items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
          <Link href="/register">
            <button
              onClick={closeMenu}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-10 lg:mt-0 w-full lg:w-auto"
            >
              Create User
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
