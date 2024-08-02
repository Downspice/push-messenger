import { Inter } from "next/font/google";
import "@/styles/globals.css";
import PrivateRoute from "@/helpers/PrivateRoute";
import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Push",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PrivateRoute>{children}</PrivateRoute>
        </Providers>
      </body>
    </html>
  );
}
