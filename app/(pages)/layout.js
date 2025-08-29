import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import TopNavigation from "@/app/components/TopNavigation";
import "../globals.css";
import CommonProviders from "@/app/src/providers/CommonProviders";
import ToastContainer from "@/app/components/ToastContainer";

import ModalContainer from "@/app/(pages)/tshirt/[slug]/_components/ModalContainer";
import BuyModal from "../components/BuyModal/BuyModal";

export const metadata = {
  title: "Esvibes - Home",
  description:
    "Esvibes - Find stylish, high-quality T-shirts with unique designs to elevate your style. Shop now for comfort, originality, and everyday vibes!",
  openGraph: {
    images: [
      {
        url: `https://i.ibb.co.com/LtjVBLq/image.png`,
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-[100px] dark:bg-[#000] dark:text-white max-w-5xl mx-auto py-6 px-6">
        <CommonProviders>
          <ToastContainer />
          <ModalContainer />
          <BuyModal />
          {/* top navbar start  */}
          <TopNavigation />
          {/* top navbar end  */}
          {/*bottom navbar start  */}
          <Navigation />

          {/*bottom navbar end */}
          {children}

          <Footer />
        </CommonProviders>
      </body>
    </html>
  );
}
