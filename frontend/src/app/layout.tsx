import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RDSystem Solutions",
  description: "Sistemas ageís e escaláveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={``}>
        {children}
      </body>
    </html>
  );
}
