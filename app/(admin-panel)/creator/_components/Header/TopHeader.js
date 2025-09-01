import UserCredentials from "@/app/src/UserCredentials";
import HamburgerButton from "./HamburgerButton";
import UserIcon from "./UserIcon";
import { auth } from "@/auth";

export default async function TopHeader() {
  const loggedAuth = await auth();
  const user = await UserCredentials(loggedAuth?.user?.id);
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-700">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 h-auto min-h-16 px-4 py-3">
        {/* Sidebar toggle for small screens */}
        <HamburgerButton />

        {/* Search bar */}
        <div className="relative flex-1 min-w-[180px] max-w-md w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-white"
          />
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
            className="lucide lucide-search absolute left-3 top-2.5 text-gray-400"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx={11} cy={11} r={8} />
          </svg>
        </div>

        {/* Right side icons */}
        <UserIcon
          user={{ name: user?.name || "Unknow", role: user?.role || "Unknown" }}
          icon={user?.name?.charAt(0) || "U"}
        />
      </div>
    </header>
  );
}
