import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Minus,
} from "lucide-react";
import Footer from "../layout/Footer";

const ContactPage = () => {
  return (
    <>
      {/* Glowing background blobs */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-yellow-500/50 flex justify-center items-center relative px-6 py-12">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 bg-black/60 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-4xl space-y-10 border border-gray-800">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <h1 className="text-3xl font-bold text-yellow-400">Contact Us</h1>
            <Minus className="h-1.5 w-10 bg-amber-50" />
            <p className="text-gray-300 max-w-xl">
              Have questions, feedback, or game suggestions? Reach out to us —
              we’re here to level up your experience and bring you the best from
              the world of gaming. Let’s connect! 🎮
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Social Icons */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50 p-6 text-center">
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Connect
              </h2>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 p-3 rounded-full hover:bg-yellow-500 transition"
                >
                  <Linkedin className="text-black" />
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 p-3 rounded-full hover:bg-yellow-500 transition"
                >
                  <Github className="text-black" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 p-3 rounded-full hover:bg-yellow-500 transition"
                >
                  <Instagram className="text-black" />
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50 p-6 flex flex-col items-center text-center space-y-3">
              <div className="bg-yellow-600 p-3 rounded-full">
                <MapPin className="text-black" />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Address</h2>
              <p className="text-gray-300 text-sm">
                123 Game Street, <br />
                Pixel City, VirtualLand 40400
              </p>
            </div>

            {/* Email */}
            <div
              className="group bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50 p-6 flex flex-col items-center text-center space-y-3 cursor-pointer"
              onClick={() =>
                (window.location.href = "mailto:example@gmail.com")
              }
            >
              <div className="bg-yellow-600 p-3 rounded-full">
                <Mail className="text-black" />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Email</h2>
              <p className="text-gray-300 text-sm">example@gmail.com</p>
            </div>

            {/* Phone */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50 p-6 flex flex-col items-center text-center space-y-3">
              <div className="bg-yellow-600 p-3 rounded-full">
                <Phone className="text-black" />
              </div>
              <h2 className="text-lg font-semibold text-yellow-400">Phone</h2>
              <p className="text-gray-300 text-sm">+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
