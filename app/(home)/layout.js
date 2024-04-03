import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Rightbar from "@/components/layout/rightbar/Rightbar";
import { UserState } from "@/context/getUserInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "whooper",
  description: "whooper website description here ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="root">
          <UserState>
            <Sidebar />
            {children}
            <Rightbar />
          </UserState>
        </div>
      </body>
    </html>
  );
}
