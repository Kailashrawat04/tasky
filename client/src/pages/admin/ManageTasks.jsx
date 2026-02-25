import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskCard from "../../components/TaskCard";
import { FiPlus, FiFilter, FiSearch, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const navigate = useNavigate();
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

  const handleExport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'tasks_report.xlsx');
      document.body.appendChild(link);
      link.click();
      toast.success("Report downloaded");
    } catch (error) {
      toast.error("Failed to export report");
    }
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Manage Tasks</h1>
          <p className="text-slate-500 font-medium mt-1">
            Browse, filter, and organize all workspace activities.
=======
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Tasks</h1>
          <p className="text-slate-500 mt-1">
            Browse and organize all project tasks.
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
<<<<<<< HEAD
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
          >
            <FiDownload className="group-hover:-translate-y-0.5 transition-transform" />
            Export Data
          </button>
          <button
            onClick={() => navigate("/admin/create-task")}
            className="btn-primary !w-auto"
          >
            <FiPlus />
            New Task
=======
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <FiDownload />
            Export
          </button>
          <button
            onClick={() => navigate("/admin/create-task")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all"
          >
            <FiPlus />
            Create Task
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
=======
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
<<<<<<< HEAD
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all ${filter === f
                ? "bg-navy text-white shadow-lg shadow-navy/20"
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

<<<<<<< HEAD
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search by title or description..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-sm font-medium placeholder:text-slate-400"
=======
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-all shadow-sm"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} isAdmin={true} />
          ))}
        </div>
      ) : (
<<<<<<< HEAD
        <div className="glass-card border-dashed border-2 border-slate-200 rounded-3xl p-24 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
            <FiFilter size={48} />
          </div>
          <h4 className="text-2xl font-black text-navy">No matches found</h4>
          <p className="text-slate-400 font-medium mt-3 max-w-sm mx-auto">
            Try refining your search or filter to see more results from the workspace.
=======
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <FiFilter size={40} />
          </div>
          <h4 className="text-xl font-bold text-slate-900">No tasks found</h4>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Try adjusting your filters or search terms to find what you're looking for.
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;