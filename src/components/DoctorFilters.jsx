import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function DoctorFilters({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  selectedCategory,
  setSelectedCategory,
  priceSort,
  setPriceSort,
  isFiltered,
  handleReset,
}) {
  const categories = [
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Cardiology",
  ];

  return (
    <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-200/60 max-w-7xl mx-10 mb-10 space-y-4">
      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
      >
        {/* ১. সার্চ ইনপুট + সার্চ বাটন */}
        <div className="md:col-span-6 flex gap-2 items-end">
          <div className="flex-1">
            <TextField
              value={searchInput}
              onChange={(value) => setSearchInput(value)}
              className="w-full"
            >
              <span className="text-sm font-medium text-slate-700 block mb-2">
                Search Doctor
              </span>
              <InputGroup className="bg-white border-slate-200 focus-within:border-cyan-500 rounded-xl transition-all border shadow-sm">
                <InputGroup.Prefix className="pl-3 text-slate-400">
                  <Magnifier className="w-4 h-4" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Name or Hospital..."
                  className="bg-transparent text-slate-800 placeholder-slate-400 text-sm py-2.5 px-3 outline-none w-full"
                />
              </InputGroup>
            </TextField>
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] h-[46px]"
          >
            Search
          </button>
        </div>

        {/* ২. ক্যাটাগরি ড্রপডাউন */}
        <div className="md:col-span-3">
          <span className="text-sm font-medium text-slate-700 block mb-2">
            Specialization
          </span>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-white text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-normal transition-all shadow-sm">
              <Select.Value>
                {selectedCategory === "all"
                  ? "All Specialties"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1">
                <ListBox.Item
                  className="text-slate-700 hover:bg-cyan-500 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  id="all"
                >
                  All Specialties
                </ListBox.Item>
                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat}
                    id={cat}
                    className="text-slate-700 hover:bg-cyan-500 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    {cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* ৩. প্রাইস সর্টিং ড্রপডাউন */}
        <div className="md:col-span-3">
          <span className="text-sm font-medium text-slate-700 block mb-2">
            Price Filter
          </span>
          <Select
            selectedKey={priceSort}
            onSelectionChange={(key) => setPriceSort(key)}
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-white text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm font-normal transition-all shadow-sm">
              <Select.Value>
                {priceSort === "all"
                  ? "Sort by Fee"
                  : priceSort === "low-high"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1">
                <ListBox.Item
                  className="text-slate-700 hover:bg-cyan-500 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  id="all"
                >
                  Default Sort
                </ListBox.Item>
                <ListBox.Item
                  className="text-slate-700 hover:bg-cyan-500 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  id="low-high"
                >
                  Price: Low to High
                </ListBox.Item>
                <ListBox.Item
                  className="text-slate-700 hover:bg-cyan-500 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  id="high-low"
                >
                  Price: High to Low
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </form>

      {/* রিসেট বাটন */}
      {isFiltered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all"
          >
            Clear Filters ×
          </button>
        </div>
      )}
    </div>
  );
}
