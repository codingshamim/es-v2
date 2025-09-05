import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import TopNavigation from "@/app/components/TopNavigation";

import ToastContainer from "@/app/components/ToastContainer";

import ModalContainer from "@/app/(pages)/tshirt/[slug]/_components/ModalContainer";

import BuyModal from "../components/BuyModal/BuyModal";

export default function Websitelayout({ children }) {
  return (
    <div className="min-h-screen bg-[#000] text-white pb-[100px]  max-w-6xl mx-auto py-6 px-6">
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
    </div>
  );
}
