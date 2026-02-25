import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FiCalendar, FiFlag, FiUsers, FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
  });
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleUserToggle = (userId) => {
    setFormData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter((id) => id !== userId)
        : [...prev.assignedTo, userId],
    }));
  };

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      todoChecklist: [...prev.todoChecklist, { text: todoInput, isCompleted: false }],
    }));
    setTodoInput("");
  };

  const removeTodo = (index) => {
    setFormData((prev) => ({
      ...prev,
      todoChecklist: prev.todoChecklist.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.assignedTo.length === 0) {
      return toast.error("Please assign at least one user");
    }

    try {
      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, formData);
      toast.success("Task created successfully");
      navigate("/admin/tasks");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-6 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-navy tracking-tight">Create New task</h1>
        <p className="text-slate-500 font-medium mt-1">
          Define the mission parameters and assign the crew.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">
=======
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Create New Task</h1>
        <p className="text-slate-500 mt-1">
          Define the task details and assign it to your team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                Task Title
              </label>
              <input
                type="text"
                required
<<<<<<< HEAD
                placeholder="e.g. Q4 Growth Strategy"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-navy placeholder:text-slate-400"
=======
                placeholder="e.g. Design System Implementation"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">
                Description
              </label>
              <textarea
                placeholder="What exactly needs to be done? Provide context and goals..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all min-h-[160px] font-medium text-slate-700 placeholder:text-slate-400"
=======
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe the task in detail..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all min-h-[120px]"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Checklist */}
<<<<<<< HEAD
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block">
              Execution Steps
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a measurable step..."
                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
=======
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <label className="text-sm font-bold text-slate-700 block">
              Todo Checklist
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a sub-task..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTodo())}
              />
              <button
                type="button"
                onClick={addTodo}
<<<<<<< HEAD
                className="p-3.5 bg-navy text-white rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-navy/20 active:scale-95"
              >
                <FiPlus size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {formData.todoChecklist.map((todo, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl group border border-transparent hover:border-slate-200 hover:bg-white transition-all">
                  <span className="text-sm font-bold text-navy">{todo.text}</span>
                  <button
                    type="button"
                    onClick={() => removeTodo(index)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
              {formData.todoChecklist.length === 0 && (
                <p className="text-center text-xs font-bold text-slate-300 py-4 uppercase tracking-wider">No sub-tasks defined</p>
              )}
=======
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
              >
                <FiPlus size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {formData.todoChecklist.map((todo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group border border-transparent hover:border-slate-200 transition-all">
                  <span className="text-sm text-slate-700">{todo.text}</span>
                  <button
                    type="button"
                    onClick={() => removeTodo(index)}
                    className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="space-y-8">
          {/* Settings */}
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-4">
                <FiFlag className="text-primary" /> Task Priority
              </label>
              <div className="grid grid-cols-3 gap-3">
=======
        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                <FiFlag className="text-primary" /> Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                {["low", "medium", "high"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
<<<<<<< HEAD
                    className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${formData.priority === p
                      ? "bg-navy text-white border-navy shadow-xl shadow-navy/20"
                      : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"
=======
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${formData.priority === p
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-4">
                <FiCalendar className="text-primary" /> Target Date
=======
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                <FiCalendar className="text-primary" /> Due Date
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
              </label>
              <input
                type="date"
                required
<<<<<<< HEAD
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold text-navy"
=======
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Assignments */}
<<<<<<< HEAD
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-2">
              <FiUsers className="text-primary" /> Assigned Crew
            </label>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
=======
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <FiUsers className="text-primary" /> Assign To
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
              {users.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleUserToggle(u._id)}
<<<<<<< HEAD
                  className={`flex items-center gap-4 p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${formData.assignedTo.includes(u._id)
                    ? "bg-primary/5 border-primary/30 shadow-inner"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.assignedTo.includes(u._id) ? "bg-primary border-primary" : "border-slate-200 bg-white"
=======
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${formData.assignedTo.includes(u._id)
                      ? "bg-primary/5 border-primary/20"
                      : "bg-white border-transparent hover:bg-slate-50"
                    }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.assignedTo.includes(u._id) ? "bg-primary border-primary" : "border-slate-300 bg-white"
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                    }`}>
                    {formData.assignedTo.includes(u._id) && <FiPlus className="text-white rotate-45" size={12} />}
                  </div>
                  <div className="flex-1">
<<<<<<< HEAD
                    <p className="text-sm font-black text-navy leading-none mb-1">{u.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 truncate w-40 uppercase tracking-tight">{u.email}</p>
=======
                    <p className="text-sm font-medium text-slate-800 leading-none">{u.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{u.email}</p>
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
<<<<<<< HEAD
            className="w-full py-5 bg-navy text-white rounded-3xl font-black text-lg shadow-2xl shadow-navy/20 hover:bg-slate-800 active:scale-[0.97] transition-all flex items-center justify-center gap-3"
          >
            Launch Task
=======
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Create Task
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;