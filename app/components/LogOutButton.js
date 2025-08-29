"use client";

import { doSignOut } from "../backend/actions";

export default function LogOutButton({ common, setCommon }) {
  return (
    <li
      onClick={async () => {
        setCommon({
          ...common,
          topbar: !common?.topbar,
        });
        await doSignOut();
      }}
      className="flex items-center gap-2 hover:bg-black w-full py-[2px] cursor-pointer px-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-log-out"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1={21} x2={9} y1={12} y2={12} />
      </svg>
      Log Out
    </li>
  );
}
