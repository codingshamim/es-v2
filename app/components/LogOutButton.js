"use client";

import { LogOut } from "lucide-react";
import { doSignOut } from "../backend/actions";

export default function LogOutButton({ isOpen, setIsOpen }) {
  return (
    <li
      onClick={async () => {
        await doSignOut();
        setIsOpen(false);
      }}
      className="flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-200 cursor-pointer group"
    >
      <LogOut className="h-4 w-4" />
      Log Out
    </li>
  );
}
