import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    </div>
  );
}
