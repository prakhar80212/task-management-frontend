"use client";

import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard";

export default function AdminPage() {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={["admin"]}>
        <div className="p-4 sm:p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
}