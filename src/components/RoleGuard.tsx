"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useContext(AuthContext)!;

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="p-10 text-center text-red-500">
        You are not authorized to view this page.
      </div>
    );
  }

  return <>{children}</>;
}