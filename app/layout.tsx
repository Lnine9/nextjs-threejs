import { Noto_Sans } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";

import ToasterProvider from "@/app/components/providers/ToasterProvider";

import "./globals.css";
import "./prism.css";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/loading";

const font = Noto_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next3",
  description: "next-three-demo",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={font.className}>
        <div className="bak hidden md:block" />
        <ToasterProvider />
        <Navbar />
        <div className="w-full flex justify-center">
          <Suspense fallback={<Loading />}>
            <div className="w-full min-h-[calc(100vh-theme(height.navh))]">
              {children}
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
