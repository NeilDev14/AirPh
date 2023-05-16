import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import FooterModal from "./components/modals/FooterModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import Footer from "./components/footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "AirPh",
  description: "AirPh App",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <Suspense fallback={<Loading />}>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <FooterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <Footer />
        </Suspense>
        <div className="pb-20 pt-44">{children}</div>
      </body>
    </html>
  );
}
