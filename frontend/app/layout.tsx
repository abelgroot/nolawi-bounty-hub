import { AlertProvider } from "@/providers/alert-provider";
import "./globals.css";
import Footer from "@/components/footer";
import QueryProvider from "@/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AlertProvider>
            {children}
            <Footer />
          </AlertProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
