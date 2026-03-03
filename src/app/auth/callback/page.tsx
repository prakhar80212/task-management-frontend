"use client";

import { useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useContext(AuthContext)!;

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const isSignup = searchParams.get("signup");

    if (error) {
      if (error === "user_not_found" || error.toLowerCase().includes("not found")) {
        toast.error("User does not exist");
        router.push("/register");
      } else if (error === "user_already_exists" || error.toLowerCase().includes("already exists")) {
        toast.error("User already exists");
        router.push("/login");
      } else {
        toast.error("Authentication failed");
        router.push("/login");
      }
      return;
    }

    if (token) {
      localStorage.setItem("accessToken", token);
      
      const decoded: DecodedToken = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });
      
      toast.success(isSignup === "true" ? "Sign up successful" : "Login successful");
      router.push("/dashboard");
    } else {
      toast.error("Authentication failed");
      router.push("/login");
    }
  }, [searchParams, router, setUser]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Authenticating...</p>
    </div>
  );
}
