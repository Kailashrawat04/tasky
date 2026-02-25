import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskCard from "../../components/TaskCard";
import { FiFilter, FiSearch, FiLayers } from "react-icons/fi";
import toast from "react-hot-toast";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async (status) => {
    try {
      const url = status && status !== "all"
        ? `${API_PATHS.TASKS.GET_ALL_TASKS}?status=${status}`
        : API_PATHS.TASKS.GET_ALL_TASKS;
      const response = await axiosInstance.get(url);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filter);
  }, [filter]);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">My Tasks</h1>
          <p className="text-slate-500 font-medium mt-1">
            Focus on what matters. Track and complete your assigned milestones.
          </p>
        </div>

        <div className="relative w-full md:w-96 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search your milestones..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-sm font-bold text-navy placeholder:text-slate-400"
=======
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-slate-500 mt-1">
            Stay organized and keep track of your assigned work.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search your tasks..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-all shadow-sm"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
=======
      <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
        {["all", "pending", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
<<<<<<< HEAD
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all ${filter === f
              ? "bg-navy text-white shadow-xl shadow-navy/20"
              : "text-slate-400 hover:text-navy hover:bg-slate-50"
=======
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
              }`}
          >
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      {loading ? (
<<<<<<< HEAD
        <div className="flex items-center justify-center p-32">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-b-primary shadow-xl"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
=======
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
<<<<<<< HEAD
        <div className="glass-card border-dashed border-2 border-slate-200 rounded-3xl p-24 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
            <FiLayers size={48} />
          </div>
          <h4 className="text-2xl font-black text-navy">Workspace is clear!</h4>
          <p className="text-slate-400 font-medium mt-3 max-w-sm mx-auto">
            No tasks found with these filters. You're doing great, why not grab a coffee?
=======
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <FiLayers size={40} />
          </div>
          <h4 className="text-xl font-bold text-slate-900">No tasks found</h4>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            You don't have any tasks matching this criteria. Keep up the good work!
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTasks;