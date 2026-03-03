"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function DashboardContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeView, setActiveView] = useState<"dashboard" | "search">("dashboard");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { search, status: filterStatus, page, limit: 5 },
      });
      setTasks(res.data.data || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 60000);
    return () => clearInterval(interval);
  }, [search, filterStatus, page]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description, startDate, startTime, endDate, endTime });
      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      fetchTasks();
    } catch {
      toast.error("Failed to create task");
    }
  };

  const toggleTaskStatus = async (taskId: string) => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      toast.success("Task status toggled");
      fetchTasks();
    } catch {
      toast.error("Failed to toggle task status");
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const startEdit = (task: any) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStartDate(task.startDate);
    setStartTime(task.startTime);
    setEndDate(task.endDate);
    setEndTime(task.endTime);
  };

  const updateTask = async (e: any) => {
    e.preventDefault();
    try {
      await api.patch(`/tasks/${editingTask.id}`, { title, description, startDate, startTime, endDate, endTime });
      toast.success("Task updated successfully");
      setTitle("");
      setDescription("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setEditingTask(null);
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="container-responsive py-6 sm:py-8 md:py-10 max-w-4xl mx-auto">
        {activeView === "dashboard" && (
          <>
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h1>
              <p className="text-sm sm:text-base text-gray-500">Add a new task to your workflow</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
              <form onSubmit={editingTask ? updateTask : handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Add task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Start Time (IST) *
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      End Time (IST) *
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 sm:py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition text-sm sm:text-base"
                  >
                    {editingTask ? "Update Task" : "Create Task"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setStartDate("");
                      setStartTime("");
                      setEndDate("");
                      setEndTime("");
                      setEditingTask(null);
                    }}
                    className="px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
                  >
                    {editingTask ? "Cancel" : "Clear"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {activeView === "search" && (
          <>
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">Search Tasks</h1>
              <p className="text-sm sm:text-base text-gray-500">Find and manage your tasks</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-400 transition text-sm sm:text-base bg-white"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Tasks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      task.priority === "high" ? "bg-red-100 text-red-700" : 
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-green-100 text-green-700"
                    }`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      task.status === "Completed" ? "bg-green-100 text-green-700" : 
                      task.status === "InProgress" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="flex-1 min-w-16 px-2 py-1.5 text-xs sm:text-sm bg-orange-400 text-white font-semibold rounded hover:bg-orange-500 transition"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => startEdit(task)}
                      className="flex-1 min-w-12 px-2 py-1.5 text-xs sm:text-sm bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 min-w-16 px-2 py-1.5 text-xs sm:text-sm bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                  {task.dueDate && (
                    <p className="text-xs sm:text-sm text-gray-400 mt-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm sm:text-base font-semibold border-2 border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm sm:text-base font-semibold text-gray-900">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm sm:text-base font-semibold border-2 border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-300 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}