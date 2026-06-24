import { Plus_Jakarta_Sans  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  description: "Best tutor booking web application in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar></Navbar>
        <main className="pt-16">{children}</main>
        <Footer></Footer>
        <Toaster></Toaster>
        </Providers>
      </body>
    </html>
  );
}
