import type { Metadata } from "next";
import "./globals.css";
import BackgroundWrapper from "@/providers/todayBgProvider";

export const metadata: Metadata = {
  title: "DateShade",
  description: "Dates, reimagined in color.",

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <BackgroundWrapper> */}
        {children}
        {/* </BackgroundWrapper> */}
      </body>
    </html>
  );
}