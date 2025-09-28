import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { toast } from "react-hot-toast";
import ImagePattern from "../components/ImagePattern.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const SingUpPage = () => {
  const { singup, isSingingUp } = useAuthStore();
  const [showPassword, setshowPassword] = useState(true);
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validForm = () => {
    if (!FormData.name.trim()) return toast.error("Name is required");
    if (!FormData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(FormData.email))
      return toast.error("Invalid email");
    if (!FormData.password.trim()) return toast.error("Password is required");
    if (!FormData.password.length < 6)
      return toast.error("Password length must me grater than 6");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let check = false;
    const success = validForm();

    if (success) {
      check = singup(FormData);
    }

    if (check) {
      navigate("/");
    }
  };

  return (
    <div className="pt-20 min-h-screen w-screen grid grid-cols-2">
      {/* Left Side */}
      <div className=" flex items-center justify-center ">
        <div className="h-[60%] w-1/2 flex flex-col items-center justify-center bg-gray-800 shadow-md rounded-lg">
          {/* Centered Icon Above the Form */}
          <div className="text-blue-500 mb-6">
            <User size={48} />
          </div>
          <form className="w-3/4" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={FormData.name}
                onChange={(e) =>
                  setFormData({ ...FormData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={FormData.email}
                onChange={(e) =>
                  setFormData({ ...FormData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label className="block text-gray-100 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type={showPassword ? "Password" : "text"}
                placeholder="Enter your password"
                value={FormData.password}
                onChange={(e) =>
                  setFormData({ ...FormData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setshowPassword(!showPassword)}
                className="absolute top-1/2 transform-translate-y-[60%] right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isSingingUp}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isSingingUp ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "singUp"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="min-h-screen bg-gray-800">
        <ImagePattern
          title="Sign Up"
          subtitle="Sign up with your email and password to start using our app."
        />
      </div>
    </div>
  );
};

export default SingUpPage;
