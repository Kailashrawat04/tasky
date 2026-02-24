import React from "react";
import { FiClock, FiCheckSquare, FiMoreVertical } from "react-icons/fi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, isAdmin = false }) => {
    const navigate = useNavigate();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-600 border-red-200";
            case "medium":
                return "bg-amber-100 text-amber-600 border-amber-200";
            case "low":
                return "bg-green-100 text-green-600 border-green-200";
            default:
                return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500";
            case "in-progress":
                return "bg-blue-500";
            default:
                return "bg-slate-400";
        }
    };

    return (
        <div
            onClick={() => navigate(isAdmin ? `/admin/tasks` : `/user/task-details/${task._id}`)}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group relative"
        >
            <div className="flex justify-between items-start mb-4">
                <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getPriorityColor(
                        task.priority
                    )}`}
                >
                    {task.priority}
                </span>
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors">
                    <FiMoreVertical size={18} />
                </button>
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {task.title}
            </h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 h-10">
                {task.description}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <FiClock size={14} />
                    <span>{moment(task.dueDate).format("MMM DD, YYYY")}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <FiCheckSquare size={14} />
                    <span>
                        {task.completedTodoCount || 0}/{task.totalTodoCount || 0}
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Progress
                    </span>
                    <span className="text-[10px] font-bold text-slate-700">
                        {Math.round(task.progress || 0)}%
                    </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 rounded-full ${getStatusColor(
                            task.status
                        )}`}
                        style={{ width: `${task.progress || 0}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
