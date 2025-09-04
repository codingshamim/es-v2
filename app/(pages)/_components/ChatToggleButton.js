"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function ChatToggleButton() {
  const { common, setCommon } = useCommonState();

  const openModal = () => {
    setCommon({ ...common, customerSupportModal: true });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!common.customerSupportModal && (
        <button
          onClick={openModal}
          className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" />
          </svg>
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
}
