"use client";
import CompanyDashboard from "@/components/company-dashboard";
import HackerDashboard from "@/components/hacker-dashboard";
import { useCurrentUser } from "@/providers/auth-provider";

export default function Page() {
  const { user } = useCurrentUser();

  if (user?.role === "company") return <CompanyDashboard />;
  if (user?.role === "hacker") return <HackerDashboard />;
}
