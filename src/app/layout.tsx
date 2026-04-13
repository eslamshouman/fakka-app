import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

import { LanguageProvider } from '../contexts/LanguageContext';

export const metadata: Metadata = {
  title: "Fakka App",
  description: "Round up your transactions for charity",
  icons: {
    icon: '/logo.png'
  }
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
        <LanguageProvider>
          <main className="app-container">
            <div className="page-content window-scroll">
              {children}
            </div>
            <NavBar />
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
