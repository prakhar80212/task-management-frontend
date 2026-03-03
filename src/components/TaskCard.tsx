"use client";

import api from "@/lib/api";
import toast from "react-hot-toast";

export default function TaskCard({ task, refresh }: any) {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      toast.success("Task deleted");
      refresh();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const toggleStatus = async () => {
    try {
      await api.patch(`/tasks/${task.id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      toast.success("Status updated");
      refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="font-bold text-base sm:text-lg break-words">{task.title}</h3>
      <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-2">{task.description}</p>
      <p className="text-xs sm:text-sm text-gray-500 mt-2">Status: {task.status}</p>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-4">
        <button
          onClick={toggleStatus}
          className="flex-1 min-w-20 bg-blue-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium hover:bg-blue-600 transition"
        >
          Toggle
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 min-w-20 bg-red-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
