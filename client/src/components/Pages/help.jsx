// pages/help.jsx (or /help/index.jsx if using Next.js)
import { Link } from "react-router-dom";

export default function HelpForm() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <form action="https://formspree.io/f/your_form_id" method="POST" className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows="4"
          className="w-full border p-2 rounded"
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
