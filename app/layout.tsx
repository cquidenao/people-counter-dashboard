import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People Counter Dashboard",
  description: "Dashboard de métricas y eventos del totem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
