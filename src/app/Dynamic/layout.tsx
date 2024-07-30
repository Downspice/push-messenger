import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/ui/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dynamic Forms",
  description: "Generate forms for dynamic forms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {/* <ModalAddFields/>  */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
