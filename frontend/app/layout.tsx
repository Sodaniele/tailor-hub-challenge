import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// --- ESTA ES LA LÍNEA QUE TIENES QUE AÑADIR/CORREGIR ---
import Navbar from "../components/NavBar";
// ------------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="es"> {/* Cambiado a español */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F2F2F2]`}
      >
        {/* El Navbar solo se mostrará si no estás en la landing, 
            pero por ahora pongámoslo para verlo */}
        {children}
      </body>
    </html>
  );
}