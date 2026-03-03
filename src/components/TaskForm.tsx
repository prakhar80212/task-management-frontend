"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function TaskForm({ onTaskCreated }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description });
      toast.success("Task created");
      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch {
      toast.error("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-5 rounded-xl shadow-md mb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Create New Task</h2>
      <input
        placeholder="Title"
        className="border p-2 sm:p-3 rounded w-full mb-3 text-sm sm:text-base focus:outline-none focus:border-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 sm:p-3 rounded w-full mb-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 resize-none"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition text-sm sm:text-base">
        Create Task
      </button>
    </form>
  );
}
