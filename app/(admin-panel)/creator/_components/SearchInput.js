'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.set('query', searchTerm.trim());
      }

      // Push new query string to the URL
      router.push(`?${params.toString()}`);
    }, 500); // debounce delay

    return () => {
      clearTimeout(handler); // clear previous timeout
    };
  }, [searchTerm,router]);

  return (
    <div className="relative flex-1 sm:flex-none sm:w-80">
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
        className="lucide lucide-search-icon lucide-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx={11} cy={11} r={8} />
      </svg>

      <input
        type="text"
        id="product-search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-dark-800/80 border border-gray-600/50 rounded-sm pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}
