"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/forgot", { email, newPassword });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      const message = error?.response?.data?.message || "";
      if (message.toLowerCase().includes("not found")) {
        toast.error("User not found");
      } else {
        toast.error(message || "Password reset failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-inter bg-white">
      {/* LEFT HERO - Hidden on mobile, shown on md and up */}
      <section className="hidden md:flex flex-1 bg-orange-50 flex-col justify-center items-center px-6 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Security card */}
        <div className="absolute top-10 right-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
            🔒
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Secure Reset</div>
            <div className="text-xs text-gray-400 mt-0.5">Encrypted process</div>
          </div>
        </div>

        {/* Protection card */}
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Data Protected</div>
            <div className="text-xs text-gray-400 mt-0.5">Industry standard</div>
          </div>
        </div>

        {/* Hero graphic */}
        <div className="w-40 h-40 relative mb-12">
          <div className="w-36 h-36 rounded-full bg-white shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-3xl">
              🔑
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-orange-400 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center leading-tight max-w-sm mx-auto">
          Regain access to your{" "}
          <span className="text-orange-400">account.</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-500 text-center leading-relaxed max-w-xs mx-auto">
          Enter your email and set a new password to reset your account securely.
        </p>
      </section>

      {/* RIGHT FORM */}
      <section className="w-full md:w-1/2 lg:w-auto lg:min-w-96 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-14 py-8 md:py-12 bg-white overflow-y-auto max-h-screen md:max-h-none">
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

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Reset Password</h1>
        <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">
          Enter your email and set a new password.
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
              required
              className={`w-full px-4 py-2.5 md:py-3 border-2 rounded-lg outline-none transition text-sm md:text-base ${
                emailFocused
                  ? "border-orange-400"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                required
                className={`w-full px-4 py-2.5 md:py-3 pr-10 border-2 rounded-lg outline-none transition text-sm md:text-base ${
                  confirmPasswordFocused
                    ? "border-orange-400"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

          {/* Reset button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 md:py-3 bg-orange-400 text-white rounded-lg font-semibold transition hover:bg-orange-500 active:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base mt-2"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 md:mt-8 text-center text-sm md:text-base text-gray-400 mb-4">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-400 hover:text-orange-500 transition"
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
