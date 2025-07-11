"use client";
import AdminDashboard from "@/components/admin-dashboard";
import CompanyDashboard from "@/components/company-dashboard";
import HackerDashboard from "@/components/hacker-dashboard";
import { useCurrentUser } from "@/providers/auth-provider";
import { redirect } from "next/navigation";

export default function Page() {
  const { user } = useCurrentUser();

  if (user?.role === "company") return <CompanyDashboard />;
  if (user?.role === "hacker") return <HackerDashboard />;
  if (user?.role === "admin") return <AdminDashboard />;

  redirect("/");
}
