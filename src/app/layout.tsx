import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Topbar from "@/components/Topbar";
// import Provider from "@/context/Provider";
import Provider from "./providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeapETF",
  description: "LeapETF 是一个去中心化金融平台，致力于为用户提供简单、高效的ETF投资体验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
            <Sidebar />
            <div className="pl-56 flex-1 pt-16">
              <div className="fixed top-0 left-56 right-0 z-50 border-b border-white/10">
                <Topbar />
              </div>
              {/* <div className="pt-16"> */}
              {children}
              {/* </div> */}
            </div>
          </div>
        </Provider>
      </body>
    </html >
  );
}
