"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function TopNav() {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex w-full gap-6 justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Nolawi</span>
          </Link>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </header>
  );
}
