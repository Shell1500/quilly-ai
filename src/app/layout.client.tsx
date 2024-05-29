"use client"; // Mark this as a client component

import { ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import { Inter, Montserrat } from "next/font/google";

type LayoutProps = {
  children: ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

const montserrat700 = Montserrat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-montserrat-700",
});

const montserrat800 = Montserrat({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-montserrat-800",
});

const montserrat900 = Montserrat({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-montserrat-900",
});

const ClientLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <NextNProgress
        color="#4fa94d"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <main
        className={`${montserrat700.variable} ${montserrat800.variable} ${montserrat900.variable}`}
      >
        {children}
      </main>
    </>
  );
};

export default ClientLayout;
