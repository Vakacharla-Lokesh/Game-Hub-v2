import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const FAQ = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-sans border-t border-gray-800 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <header className="py-6 text-center relative z-10">
          <h1 className="text-yellow-400 text-3xl font-bold">
            Frequently Asked Questions
          </h1>
        </header>

        <main className="flex flex-col items-center p-5 relative z-10 space-y-6">
          {[
            {
              title: "General Questions",
              items: [
                {
                  q: "What is this website about?",
                  a: "This website is the one-stop to all your favourite games.",
                },
                {
                  q: "How do I contact you?",
                  a: (
                    <>
                      You can contact us through our contact form or by emailing
                      us at{" "}
                      <a
                        href="mailto:info@example.com"
                        className="text-blue-400 hover:text-blue-600"
                      >
                        info@example.com
                      </a>
                      .
                    </>
                  ),
                },
              ],
            },
            {
              title: "Account Questions",
              items: [
                {
                  q: "How do I create an account?",
                  a: 'Click on the "Sign Up" button in the top right corner and follow the instructions.',
                },
                {
                  q: "I forgot my password, what do I do?",
                  a: 'Click on the "Forgot Password" link on the login page and follow the instructions.',
                },
                {
                  q: "How do I change my email address?",
                  a: 'Go to your account settings and select "Change Email".',
                },
                {
                  q: "How can I delete my account?",
                  a: 'Contact our support team through the "Help" section for assistance.',
                },
              ],
            },
            {
              title: "Technical Questions",
              items: [
                {
                  q: "What browsers do you support?",
                  a: "We support the latest versions of Chrome, Firefox, Safari, and Edge.",
                },
                {
                  q: "Why isn't the website working on my device?",
                  a: "Try clearing your browser cache and cookies, or try a different browser.",
                },
                {
                  q: "Why is my game not loading?",
                  a: "Ensure a stable internet connection, clear cache, and try reloading the game.",
                },
              ],
            },
            {
              title: "Other Questions",
              items: [
                {
                  q: "Can I play the game on multiple devices?",
                  a: "Yes, as long as you log in with the same account.",
                },
                {
                  q: "Is the game free-to-play?",
                  a: "Yes, the game is free-to-play with optional in-game purchases.",
                },
              ],
            },
          ].map((section, i) => (
            <section
              key={i}
              className="w-full max-w-4xl bg-[#1b1c1d] p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
            >
              <h2 className="text-yellow-400 text-2xl font-semibold mb-5">
                {section.title}
              </h2>
              <ul className="space-y-6">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <h3 className="text-xl font-semibold mb-1">{item.q}</h3>
                    <p className="text-gray-300">{item.a}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
