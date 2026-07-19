import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shear/NavBar";
import Footer from "@/components/shear/Footer";
import AIAssistantWidget from "@/components/shear/AIAssistantWidget";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediCare Connect",
  description: "Best MediCare Connect in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-light min-h-full flex flex-col">
        <NavBar />
        {children}
        <Toaster />
        <AIAssistantWidget />
        <Footer/>
        </body>
    </html>
  );
}
