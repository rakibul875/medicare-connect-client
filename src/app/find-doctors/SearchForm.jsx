"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchForm({ initialSearch, initialCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term, category) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset to page 1 on new search
    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="mx-10 my-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          defaultValue={initialSearch}
          placeholder="Search by Doctor Name..."
          onChange={(e) => handleSearch(e.target.value, searchParams.get("category") || "")}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        
        <select
          defaultValue={initialCategory}
          onChange={(e) => handleSearch(searchParams.get("search") || "", e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white"
        >
          <option value="">All Specialties</option>
          <option value="Neurology">Neurology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Dentistry">Dentistry</option>
        </select>
        
        {/* We can keep a visual indicator if it's loading, but the button is no longer needed since it auto-updates */}
        {isPending && <span className="text-cyan-500 self-center">Searching...</span>}
      </div>
    </div>
  );
}
