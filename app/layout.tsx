import Navbar from "./components/navbar";
import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/vazirmatn/400.css";

export const metadata: Metadata = {
  title: "اقامتگاه بومگردی ولاش",
  description: "اقامتگاه بومگردی ولاش - تجربه آرامش در طبیعت لرستان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          direction: "rtl",
          backgroundColor: "#F7F3EA",
        }}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}