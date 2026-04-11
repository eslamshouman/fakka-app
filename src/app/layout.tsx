import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Fakka App",
  description: "Round up your transactions for charity",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="app-container">
          <div className="page-content window-scroll">
            {children}
          </div>
          <NavBar />
        </main>
      </body>
    </html>
  );
}
