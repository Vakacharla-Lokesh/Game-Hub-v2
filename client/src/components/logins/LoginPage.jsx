import React, { useEffect, useState } from "react";
import { loginUser } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/tokenService";

function LoginPage() {
  const [formData, setFormData] = useState({ emailId: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(formData);
      const response = await loginUser(formData);
      console.log("response from api: ", response);
      if (response.status == 400) {
        // console.log("error with login");
        setFormData({ emailId: "", password: "" });
        navigate("/login");
      }
      if (response.token) {
        navigate("/games");
      }
    } catch (error) {
      // console.log("error with login catch: ", error);
      if (error.response && error.response.status === 401) {
        // Invalid credentials: redirect to /login (or show a message)
        setFormData({ emailId: "", password: "" });
        navigate("/login");
      } else {
        // Handle other errors if needed
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = getToken();
      if (token) {
        navigate("/games");
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/images/ApexLegends.jpg')" }}
      />
      {/* Right-aligned Form Container */}
      <div className="relative z-10 h-full flex items-center justify-end pr-20">
        <div className="bg-black/70 p-8 rounded-lg w-full max-w-md">
          <div>
            <Link
              to="/"
              className="flex items-center text-white px-1 py-1"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Welcome Back
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-red-600 border-2 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-red-600 border-2 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-transparent border-red-600 border-2 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 flex justify-center items-center">
            <p className="text-white text-sm ">
              New User?{" "}
              <a
                href="/sign-up"
                className="text-red-600"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
