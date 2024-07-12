import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/CommonLayout";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talent Trade - Exchange and Expand Your Knowledge",
  description: "Talent Trade is an innovative platform for knowledge exchange. Connect with experts in various fields and expand your skills collaboratively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-screen w-full m-0 p-0">
      <body className={`${inter.className} bg-gray-100`}>
          <AuthContextProvider>
            <CommonLayout>
              {children}
            </CommonLayout>
          </AuthContextProvider>
      </body>
    </html>
  );
}
