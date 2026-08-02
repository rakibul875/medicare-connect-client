"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search } from "lucide-react";

export default function SearchForm({ initialSearch, initialCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const categories = [
    "Neurology",
    "Cardiology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Dentistry"
  ];

  const handleSearch = (newTerm, newCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset to page 1 on new search
    params.set("page", "1");

    if (newTerm !== undefined) {
      if (newTerm) {
        params.set("search", newTerm);
      } else {
        params.delete("search");
      }
    }

    if (newCategory !== undefined) {
      if (newCategory) {
        params.set("category", newCategory);
      } else {
        params.delete("category");
      }
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const currentSearch = searchParams.get("search") ?? initialSearch ?? "";
  const currentCategory = searchParams.get("category") ?? initialCategory ?? "";

  return (
    <div className="mx-10 my-8">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        {/* Search Input Area */}
        <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 py-2 w-full md:w-auto">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            defaultValue={currentSearch}
            placeholder="Search doctor by name..."
            onChange={(e) => handleSearch(e.target.value, undefined)}
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>
        
        {/* Filter Buttons Area */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pb-2 md:pb-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSearch(undefined, "")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              currentCategory === "" 
                ? "bg-[#F37021] text-white" 
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSearch(undefined, cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                currentCategory === cat 
                  ? "bg-[#F37021] text-white" 
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {isPending && <span className="text-cyan-500 self-center hidden md:block text-sm mr-2">...</span>}
      </div>
    </div>
  );
}
