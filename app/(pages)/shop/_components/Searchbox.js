"use client";
import useDebounce from "@/app/src/hooks/useDebounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Searchbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  function handleSearch(term) {
    doSearch(term);
  }

  return (
    <div className="relative col-span-3 md:col-span-2">
      <input
        className="outline-none focus:border-white py-[4px] rounded-sm w-full px-8 bg-transparent nav-border"
        type="text"
        name="search"
        placeholder="Search your exciting tshirt..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-2 left-1 svg lucide lucide-search"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
}
