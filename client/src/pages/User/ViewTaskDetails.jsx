import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FiClock, FiFlag, FiCheckCircle, FiUser, FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import moment from "moment";
import toast from "react-hot-toast";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      setTask(response.data);
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
        >
          <FiArrowLeft />
          Back
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <FiMoreHorizontal size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Header & Description */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
                {task.priority} Priority
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <FiClock />
                Due {moment(task.dueDate).format("MMMM DD, YYYY")}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 leading-tight">
              {task.title}
            </h1>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Description</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Task Checklist</h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {Math.round(task.progress)}% Complete
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: `${task.progress}%` }}
              />
            </div>

            <div className="space-y-3">
              {task.todoChecklist?.map((todo, index) => (
                <div
                  key={index}
                  onClick={() => handleToggleChecklist(index)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all ${todo.isCompleted
                      ? "bg-emerald-50/50 border-emerald-100 text-slate-500"
                      : "bg-white border-slate-100 hover:border-primary/30 shadow-sm text-slate-800"
                    }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${todo.isCompleted ? "bg-emerald-500 border-emerald-500" : "border-slate-200"
                    }`}>
                    {todo.isCompleted && <FiCheckCircle className="text-white" size={16} />}
                  </div>
                  <span className={`flex-1 font-medium ${todo.isCompleted ? "line-through" : ""}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
              {task.todoChecklist?.length === 0 && (
                <p className="text-slate-400 text-center py-4 italic">No sub-tasks defined.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Status Control */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Current Status</h3>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full p-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all border ${task.status === status
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20"
                      : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-600"
                    }`}
                >
                  {status.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Users */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Assigned Team</h3>
            <div className="space-y-4">
              {task.assignedTo?.map((u) => (
                <div key={u._id} className="flex items-center gap-4">
                  {u.profileImageUrl ? (
                    <img src={u.profileImageUrl} alt={u.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <FiUser size={24} />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
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