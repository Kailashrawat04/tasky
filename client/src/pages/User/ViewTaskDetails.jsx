import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FiClock, FiFlag, FiCheckCircle, FiUser, FiArrowLeft, FiMoreHorizontal, FiPlus, FiLayers } from "react-icons/fi";
import { useUserContext } from "../../context/UserContext";
import moment from "moment";
import toast from "react-hot-toast";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  const isOverdue = task && new Date(task.dueDate) < new Date() && task.status !== "completed";

  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newDueDate, setNewDueDate] = useState("");

  const fetchTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      setTask(response.data);
      setNewDueDate(moment(response.data.dueDate).format("YYYY-MM-DD"));
    } catch (error) {
      toast.error("Failed to load task details");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      await axiosInstance.post(API_PATHS.TASKS.ATTACH_FILE(id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File attached successfully");
      fetchTaskDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to attach file");
    } finally {
      setUploading(false);
    }
  };

  const handleExtendDueDate = async () => {
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(id), { dueDate: newDueDate });
      toast.success("Due date extended successfully");
      setShowDatePicker(false);
      fetchTaskDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to extend due date");
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(id));
      toast.success("Task deleted successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_STATUS(id), { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchTaskDetails();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleToggleChecklist = async (index) => {
    const updatedChecklist = [...task.todoChecklist];
    updatedChecklist[index].isCompleted = !updatedChecklist[index].isCompleted;

    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id), {
        todoChecklist: updatedChecklist
      });
      fetchTaskDetails();
    } catch (error) {
      toast.error("Failed to update checklist");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-600 border-red-200";
      case "medium": return "bg-amber-100 text-amber-600 border-amber-200";
      case "low": return "bg-green-100 text-green-600 border-green-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const statusOptions = ["pending", "in-progress", "completed"];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:text-navy hover:border-navy transition-all shadow-sm"
        >
          <FiArrowLeft />
          Back to Workspace
        </button>
        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <button
              onClick={handleDeleteTask}
              className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
              title="Delete Task"
            >
              <FiMoreHorizontal size={20} className="rotate-90" />
            </button>
          )}
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-navy transition-all shadow-sm">
            <FiMoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Header & Description */}
          <div className="glass-card p-10 rounded-[40px] space-y-8">
            <div className="flex flex-wrap items-center gap-5">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${getPriorityColor(task.priority)}`}>
                {task.priority} Priority
              </span>
              <div className="w-[1px] h-6 bg-slate-100" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                  <FiClock className="text-primary" />
                  Target {moment(task.dueDate).format("MMM DD, YYYY")}
                </div>
                {user?.role === "admin" && (
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                  >
                    {showDatePicker ? "Cancel" : "Extend Mission"}
                  </button>
                )}
              </div>

              {showDatePicker && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-primary"
                  />
                  <button
                    onClick={handleExtendDueDate}
                    className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-blue-600 active:scale-95 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-4xl font-black text-navy leading-tight tracking-tight">
              {task.title}
            </h1>

            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Mission Brief</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {task.description || "No description provided."}
              </p>
            </div>

            {/* Attachments Section */}
            <div className="space-y-4 pt-6 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Assets</h3>
                {user?.role === "admin" && (
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-100 transition-all group">
                    <FiPlus className="text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attach File</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task.attachments?.map((file, idx) => (
                  <a
                    key={idx}
                    href={`http://localhost:8000${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-[20px] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                      <FiLayers size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-navy truncate tracking-tight">{file.split("-").slice(1).join("-") || file}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Asset {idx + 1}</p>
                    </div>
                  </a>
                ))}
                {(!task.attachments || task.attachments.length === 0) && (
                  <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest italic">No assets deployed for this mission.</p>
                )}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="glass-card p-10 rounded-[40px] space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Execution Steps</h3>
              <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                  {Math.round(task.progress)}% COMPLETED
                </span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${task.progress}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {task.todoChecklist?.map((todo, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (isOverdue && user?.role !== "admin") {
                      toast.error("Mission overdue. Controls restricted.");
                      return;
                    }
                    handleToggleChecklist(index);
                  }}
                  className={`flex items-center gap-5 p-5 rounded-[24px] transition-all border-2 ${isOverdue && user?.role !== "admin" ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    } ${todo.isCompleted
                      ? "bg-slate-50/50 border-transparent text-slate-400"
                      : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 text-navy"
                    }`}
                >
                  <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${todo.isCompleted ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-slate-200 bg-white"
                    }`}>
                    {todo.isCompleted && <FiCheckCircle className="text-white" size={18} />}
                  </div>
                  <span className={`flex-1 text-sm font-black tracking-tight ${todo.isCompleted ? "line-through opacity-50" : ""}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
              {task.todoChecklist?.length === 0 && (
                <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
                  <p className="text-slate-300 text-xs font-black uppercase tracking-[0.2em]">No execution steps defined</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Status Control */}
          <div className="glass-card p-8 rounded-[32px] space-y-8 relative overflow-hidden">
            {isOverdue && user?.role !== "admin" && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-4 shadow-inner">
                  <FiClock size={24} />
                </div>
                <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] mb-2">Mission Overdue</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-tight">
                  Target date has passed. Request an extension from command.
                </p>
              </div>
            )}
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Update Mission Status</h3>
            <div className="grid grid-cols-1 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  disabled={isOverdue && user?.role !== "admin"}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full p-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all border-2 ${task.status === status
                    ? "bg-navy text-white border-navy shadow-2xl shadow-navy/20 active:scale-95"
                    : "bg-white text-slate-400 border-slate-50 hover:bg-slate-50 hover:text-navy hover:border-slate-200"
                    } ${isOverdue && user?.role !== "admin" ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {status.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Users */}
          <div className="glass-card p-8 rounded-[32px] space-y-8">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Assigned Crew</h3>
            <div className="space-y-6">
              {task.assignedTo?.map((u) => (
                <div key={u._id} className="flex items-center gap-4 group">
                  <div className="relative">
                    {u.profileImageUrl ? (
                      <img src={u.profileImageUrl} alt={u.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-50">
                        <FiUser size={28} />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-black text-navy text-sm leading-tight">{u.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskDetails;