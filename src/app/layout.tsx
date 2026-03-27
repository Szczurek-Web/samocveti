import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingMessenger from "@/components/ui/FloatingMessenger";
import ToastContainer from "@/components/ui/ToastContainer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samocveti.by"),
  title: "Samocveti — Подарки из натурального камня",
  description:
    "Оригинальные подарки из натурального камня. Картины, часы, украшения, сувениры. Уникальные изделия ручной работы для особых случаев.",
  keywords: [
    "подарки из камня",
    "натуральный камень",
    "украшения",
    "сувениры",
    "картины из камня",
    "ручная работа",
  ],
  openGraph: {
    title: "Samocveti — Подарки из натурального камня",
    description:
      "Уникальные изделия ручной работы из натурального камня для особых случаев",
    type: "website",
    locale: "ru_BY",
    siteName: "Samocveti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <ErrorBoundary>
          <main className="min-h-screen">{children}</main>
        </ErrorBoundary>
        <Footer />
        <FloatingMessenger />
        <ToastContainer />
      </body>
    </html>
  );
}
