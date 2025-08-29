import CommonProviders from "@/app/src/providers/CommonProviders";
import "../globals.css";
import TopHeader from "./creator/_components/Header/TopHeader";
import Sidebar from "./creator/_components/Sidebar/Sidebar";
import ConfirmationModal from "./creator/_components/ConfirmationModal";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="  text-white bg-[#000] ">
        <CommonProviders>
          <ConfirmationModal />
          <Sidebar />

          <div className="lg:ml-64">
            <TopHeader />

            {children}
          </div>
        </CommonProviders>
      </body>
    </html>
  );
}
