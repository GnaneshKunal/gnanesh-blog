import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gnanesh",
  description: "Personal website and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
