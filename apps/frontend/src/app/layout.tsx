import type { Metadata } from "next";
import Link from "next/link";
import { Boxes } from "lucide-react";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS DevOps Portfolio",
  description: "Production-ready full-stack DevOps portfolio project"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <Boxes size={18} aria-hidden="true" />
              </span>
              AWS DevOps Portfolio
            </Link>
            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/users">Users</Link>
            </nav>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
