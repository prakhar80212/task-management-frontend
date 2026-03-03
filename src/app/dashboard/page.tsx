"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}