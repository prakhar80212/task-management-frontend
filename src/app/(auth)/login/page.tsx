"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useContext(AuthContext)!;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    try {
      await login(email, password);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      const message = error?.response?.data?.message || "";
      if (
        message.toLowerCase().includes("user") &&
        (message.toLowerCase().includes("not found") ||
          message.toLowerCase().includes("does not exist"))
      ) {
        toast.error("User does not exist");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-inter bg-white">
      {/* LEFT HERO - Hidden on mobile, shown on md and up */}
      <section className="hidden md:flex flex-1 bg-orange-50 flex-col justify-center items-center px-6 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Priority Tasks card */}
        <div className="absolute top-10 right-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
            ⭐
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Priority Tasks</div>
            <div className="text-xs text-gray-400 mt-0.5">Manage efficiently</div>
          </div>
        </div>

        {/* Team Collaboration card */}
        <div className="absolute bottom-32 left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4f6fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Team Collaboration</div>
            <div className="text-xs text-gray-400 mt-0.5">Sync with 20+ members</div>
          </div>
        </div>

        {/* Hero graphic */}
        <div className="w-40 h-40 relative mb-12">
          <div className="w-36 h-36 rounded-full bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4caf50"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-orange-400 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center leading-tight max-w-sm mx-auto">
          Take control of your{" "}
          <span className="text-orange-400">productivity.</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-500 text-center leading-relaxed max-w-xs mx-auto">
          The all-in-one workspace for your tasks, projects, and teams. Simplified for your busy lifestyle.
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="w-full md:w-1/2 lg:w-auto lg:min-w-96 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-14 py-8 md:py-12 bg-white">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8 md:mb-10">
          <div className="w-9 h-9 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
              <polyline
                points="8 12 11 15 16 9"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-900">TaskPro</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Sign In</h1>
        <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg outline-none transition text-sm md:text-base ${
                emailFocused
                  ? "border-orange-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-900">
                Password
              </label>
              <Link
                href="/forgot"
                className="text-sm font-semibold text-orange-400 hover:text-orange-500 transition"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full px-4 py-2.5 md:py-3 pr-10 border-2 rounded-lg outline-none transition text-sm md:text-base ${
                  passwordFocused
                    ? "border-orange-400"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="keep"
              className="w-4 h-4 accent-orange-400 cursor-pointer rounded"
            />
            <label htmlFor="keep" className="text-sm text-gray-600 cursor-pointer">
              Keep me signed in
            </label>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full py-2.5 md:py-3 bg-orange-400 text-white rounded-lg font-semibold transition hover:bg-orange-500 active:bg-orange-600 text-sm md:text-base"
          >
            Sign in
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center gap-3 my-4 md:my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs md:text-sm text-gray-400 font-semibold tracking-wide">
            OR SIGN IN WITH
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?redirect=${encodeURIComponent(
              window.location.origin + "/auth/callback"
            )}`)
          }
          className="w-full py-2.5 md:py-3 border-2 border-gray-200 rounded-lg bg-white flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 6.9 6.6 3.4 14.6l7 5.4C12.1 13.5 17.5 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.2 5.2-4.7 6.8l7.2 5.6C43.4 36.8 46.5 31 46.5 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.4 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.6 2.6 10.8l7.8-6.2z"
            />
            <path
              fill="#34A853"
              d="M24 47c5.5 0 10.2-1.8 13.6-4.9l-7.2-5.6c-1.8 1.2-4.1 2-6.4 2-6.4 0-11.8-4.3-13.6-10.1l-7.8 6.2C6.8 41.5 14.8 47 24 47z"
            />
          </svg>
          Google
        </button>

        <p className="mt-6 md:mt-8 text-center text-sm md:text-base text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-400 hover:text-orange-500 transition"
          >
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
}
