import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/CommonLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talent Trade - Intercambia y Expande tu Conocimiento",
  description: "Talent Trade es una plataforma innovadora para el intercambio de conocimientos. Conecta con expertos en diversas áreas y amplía tus habilidades de manera colaborativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-screen w-full m-0 p-0">
      <body className={`${inter.className} bg-gray-100 text-gray-700`}>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
