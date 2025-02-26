import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../app/context/authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SRM CodeHub - By Students, For Students",
  description: "A modern learning platform created by SRM students for SRM students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}