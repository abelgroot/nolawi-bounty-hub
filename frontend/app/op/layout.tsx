import TopNav from "@/components/top-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
