"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function ChatCloseButton() {
  const { common, setCommon } = useCommonState();

  const closeModal = () => {
    setCommon({ ...common, customerSupportModal: false });
  };

  return (
    <button
      onClick={closeModal}
      className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
