"use client";

export default function Pagination({ page, setPage, totalPages }: any) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-2 sm:gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
      >
        Prev
      </button>

      <span className="text-sm sm:text-base font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>
  );
}