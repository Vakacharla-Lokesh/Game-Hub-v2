import React from 'react'
import { FaArrowUp } from 'react-icons/fa';


function Footer() {
  return (
    <footer className="bg-[#0f0c29] text-white font-semibold font-[Poppins] py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Logo + Branding */}
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {/* Logo pattern */}
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 ${
                  i % 2 === 0 ? 'rotate-45' : ''
                } bg-black`}
              ></div>
            ))}
          </div>
          <h1 className="text-2xl font-semibold tracking-wide">ClosetNow</h1>
        </div>

        {/* About Us */}
        <div>
          <h2 className="font-semibold mb-4">About Us</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#">Contact</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold mb-4">Support</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#">Contact</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">FAQ's</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="font-semibold mb-4">Social</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black my-8"></div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-black">
        <p>© {new Date().getFullYear()} ClosetNow</p>
        <p>Terms of Service</p>
        <a href="#" className="flex items-center gap-1 hover:underline">
          Back to top <FaArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}

export default Footer