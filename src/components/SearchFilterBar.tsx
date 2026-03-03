"use client";

export default function SearchFilterBar({
  search,
  setSearch,
  status,
  setStatus,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
      <input
        placeholder="Search by title..."
        className="border-2 border-gray-200 p-2 sm:p-3 rounded w-full flex-1 text-sm sm:text-base focus:outline-none focus:border-blue-500 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border-2 border-gray-200 p-2 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:border-blue-500 transition bg-white"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}