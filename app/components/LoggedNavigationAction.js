"use client";

import { useEffect, useState } from "react";
import useCommonState from "../src/hooks/useCommonState";
import TopbarItem from "./TopbarItem";
import { TopbarActionDat } from "../info/TopbarActionsJson";
import LogOutButton from "./LogOutButton";

export default function LoggedNavigationAction({ children }) {
  const { common, setCommon } = useCommonState();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true only after component mounts on client
  }, []);

  if (!isClient) return null; // Prevent rendering until on client side

  return (
    <>
      <div
        onClick={() =>
          setCommon({
            ...common,
            topbar: !common?.topbar,
          })
        }
        className="cursor-pointer logged-in-user flex justify-center items-center gap-2"
      >
        {children}
        <div className="cursor-pointer hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-chevron-down transition-transform duration-300 ${
              common?.topbar ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div
        className={`bg-secondary z-50 transition-all duration-300 fixed ${
          common?.topbar ? "top-20 opacity-100" : "top-16 opacity-0 invisible"
        } shadow-lg right-9 md:right-60 px-2 w-[200px] py-2 visible`}
      >
        <ul className=" text-sm select-none space-y-2">
          {TopbarActionDat.map((item) => (
            <TopbarItem target={item?.link} key={item?.id} title={item?.title}>
              {item?.svg}
            </TopbarItem>
          ))}
          <LogOutButton common={common} setCommon={setCommon} />
        </ul>
      </div>
    </>
  );
}
