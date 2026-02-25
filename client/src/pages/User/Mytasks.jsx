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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
        {["all", "pending", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all ${filter === f
              ? "bg-navy text-white shadow-xl shadow-navy/20"
              : "text-slate-400 hover:text-navy hover:bg-slate-50"
              }`}
          >
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-32">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-b-primary shadow-xl"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="glass-card border-dashed border-2 border-slate-200 rounded-3xl p-24 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
            <FiLayers size={48} />
          </div>
          <h4 className="text-2xl font-black text-navy">Workspace is clear!</h4>
          <p className="text-slate-400 font-medium mt-3 max-w-sm mx-auto">
            No tasks found with these filters. You're doing great, why not grab a coffee?
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTasks;