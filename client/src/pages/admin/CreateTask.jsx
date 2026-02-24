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
                Task Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Design System Implementation"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe the task in detail..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <label className="text-sm font-bold text-slate-700 block">
              Todo Checklist
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a sub-task..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTodo())}
              />
              <button
                type="button"
                onClick={addTodo}
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
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                <FiFlag className="text-primary" /> Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${formData.priority === p
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                <FiCalendar className="text-primary" /> Due Date
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-sm"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <FiUsers className="text-primary" /> Assign To
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {users.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleUserToggle(u._id)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${formData.assignedTo.includes(u._id)
                      ? "bg-primary/5 border-primary/20"
                      : "bg-white border-transparent hover:bg-slate-50"
                    }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.assignedTo.includes(u._id) ? "bg-primary border-primary" : "border-slate-300 bg-white"
                    }`}>
                    {formData.assignedTo.includes(u._id) && <FiPlus className="text-white rotate-45" size={12} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 leading-none">{u.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;