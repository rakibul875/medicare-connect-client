"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import DoctorFilters from "./DoctorFilters";
import FindDoctor from "./FindDoctor";

export default function DoctorListingContainer({
  initialDoctors,
  filters,
  total,
}) {
  // input এ টাইপ করার জন্য আলাদা স্টেট (যাতে সার্চ বাটনে ক্লিক করার আগে API কল না হয়)
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "all",
  );
  const [priceSort, setPriceSort] = useState(filters.priceSort || "all");
  const [page, setPage] = useState(Number(filters.page) || 1);

  const router = useRouter();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(total / itemsPerPage);

  // ইউজার কোনো কিছু পরিবর্তন করেছে কি না তা চেক করার লজিক (Reset Button দেখানোর জন্য)
  const isFiltered =
    searchInput !== "" || selectedCategory !== "all" || priceSort !== "all";

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  // সার্চ বাটনে ক্লিক করলে এই ফাংশনটি রান হবে
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  // রিসেট বাটনে ক্লিক করলে সব ডিফল্ট হয়ে যাবে
  const handleReset = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceSort("all");
    setPage(1);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setPage(1);
  };
  const handlePriceChange = (val) => {
    setPriceSort(val);
    setPage(1);
  };

  // ফিল্টার স্টেট কোয়েরি আকারে URL এ পুশ করা
  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchQuery) sp.set("search", searchQuery);
    if (selectedCategory !== "all") sp.set("category", selectedCategory);
    if (priceSort !== "all") sp.set("priceSort", priceSort);
    if (page) sp.set("page", page);

    const path = `?${sp.toString()}`;
    router.push(path, { scroll: false });
  }, [router, searchQuery, selectedCategory, priceSort, page]);

  return (
    <>
      <DoctorFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        priceSort={priceSort}
        setPriceSort={handlePriceChange}
        isFiltered={isFiltered}
        handleReset={handleReset}
      />

      <div className="mx-10 mb-6 text-sm text-zinc-500">
        Showing {initialDoctors.length} specialist
        {initialDoctors.length !== 1 && "s"}
      </div>

      {initialDoctors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-10">
            {initialDoctors.map((doctor) => (
              <FindDoctor key={doctor._id} doctor={doctor} />
            ))}
          </div>

          <Pagination className="w-full my-10 flex justify-center">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {total} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-300 rounded-[32px] mx-10">
          <p className="text-zinc-500 text-lg">
            No doctors match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
