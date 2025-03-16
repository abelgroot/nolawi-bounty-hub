import TopNav from "@/components/top-nav";
import { AuthProvider } from "@/providers/auth-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div>
        <TopNav />
        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
