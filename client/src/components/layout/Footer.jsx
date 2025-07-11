import React from "react";
import { FaArrowUp } from "react-icons/fa";
import ScrollToTopButton from "../ScrollToTopButton";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f0c29] text-white font-semibold font-[Poppins] py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        <Link
          to="/"
          className="flex flex-col items-start"
        >
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 ${
                  i % 2 === 0 ? "rotate-45" : ""
                } bg-black dark:bg-white`}
              ></div>
            ))}
          </div>
          <h1 className="text-2xl font-semibold tracking-wide">GameHub</h1>
        </Link>

        {/* About Us */}
        <div>
          <h2 className="font-semibold mb-4 text-2xl">About Us</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/contact">Team</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold mb-4 text-2xl">Support</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faqs">FAQ's</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="font-semibold mb-4 text-2xl">Social</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://www.linkedin.com/in/lokesh-vakacharla-00472a250/">LinkedIn-1</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/khushi-omar-a21508250/">LinkedIn-2</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white my-8"></div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-center items-center text-sm text-black dark:text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">© {new Date().getFullYear()} GameHub</p>
          <p>Terms of Service</p>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}

export default Footer;
