"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface NavbarProps {
  activeView: "dashboard" | "search";
  onViewChange: (view: "dashboard" | "search") => void;
}

export default function Navbar({ activeView, onViewChange }: NavbarProps) {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    if (authContext) {
      await authContext.logout();
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-1000 bg-white border-b border-gray-200 nav-padding py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold text-white flex-shrink-0">
            T
          </div>
          <span className="hidden sm:inline text-base sm:text-lg font-bold text-gray-900">TaskPro</span>
        </div>

        {/* Navigation Links - Hidden on mobile, shown on sm and up */}
        <div className="hidden sm:flex gap-6 md:gap-8">
          <button
            onClick={() => onViewChange("dashboard")}
            className={`text-sm md:text-base font-semibold pb-2 border-b-2 transition-all ${
              activeView === "dashboard"
                ? "text-orange-400 border-orange-400"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onViewChange("search")}
            className={`text-sm md:text-base font-semibold pb-2 border-b-2 transition-all ${
              activeView === "search"
                ? "text-orange-400 border-orange-400"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Search
          </button>
        </div>

        {/* Mobile Navigation - Shown on mobile only */}
        <div className="sm:hidden flex gap-2">
          <button
            onClick={() => onViewChange("dashboard")}
            className={`text-xs font-semibold pb-1 border-b-2 transition-all ${
              activeView === "dashboard"
                ? "text-orange-400 border-orange-400"
                : "text-gray-600 border-transparent"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onViewChange("search")}
            className={`text-xs font-semibold pb-1 border-b-2 transition-all ${
              activeView === "search"
                ? "text-orange-400 border-orange-400"
                : "text-gray-600 border-transparent"
            }`}
          >
            Search
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-orange-400 rounded-lg hover:bg-red-500 transition-all flex-shrink-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
