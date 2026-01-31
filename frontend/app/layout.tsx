import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// IMPORTAMOS EL PROVIDER
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Añadido para mejor rendimiento de carga
});

export const metadata: Metadata = {
  title: "Tailor Hub - Restaurants",
  description: "Prueba técnica para Junior Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F2F2F2]`}
      >
        {/* ENVOLVEMOS LOS HIJOS CON EL PROVIDER */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}