
import HamburgerButton from "./HamburgerButton";

export default function TopHeader() {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-700">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 h-auto min-h-16 px-4 py-3">
        {/* Sidebar toggle for small screens */}
      <HamburgerButton/>

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
        <div className="flex items-center gap-3 ml-auto">
          <button className="text-gray-400 hover:text-white relative">
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
              className="lucide lucide-bell"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">M</span>
          </div>
        </div>
      </div>
    </header>
  );
}
