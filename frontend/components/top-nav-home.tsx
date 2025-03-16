import Link from "next/link";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";

export default function TopNavHome() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Nolawi</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#services"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#stories"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Our Stories
            </Link>
            <Link
              href="#testimonials"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/auth/login">
            <Button variant="outline" className="hidden md:flex">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
