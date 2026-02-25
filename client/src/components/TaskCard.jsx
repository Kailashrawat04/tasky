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
                return "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]";
            case "in-progress":
                return "bg-primary shadow-[0_0_12px_rgba(19,104,236,0.4)]";
            default:
                return "bg-slate-300";
        }
    };

    return (
        <div
            onClick={() => navigate(isAdmin ? `/admin/tasks` : `/user/task-details/${task._id}`)}
            className="stat-card group cursor-pointer relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <span
                    className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border ${getPriorityColor(
                        task.priority
                    )} shadow-sm`}
                >
                    {task.priority}
                </span>
                <button className="text-slate-300 hover:text-navy p-1.5 rounded-xl hover:bg-white transition-all">
                    <FiMoreVertical size={18} />
                </button>
            </div>

            <h3 className="text-lg font-black text-navy mb-2 line-clamp-1 group-hover:text-primary transition-colors relative z-10">
                {task.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-2 h-10 relative z-10">
                {task.description}
            </p>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100 relative z-10">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                    <FiClock size={14} className="text-primary" />
                    <span>{moment(task.dueDate).format("MMM DD, YYYY")}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                    <FiCheckSquare size={14} className="text-emerald-500" />
                    <span>
                        {task.completedTodoCount || 0}/{task.totalTodoCount || 0}
                    </span>
                </div>
            </div>

            <div className="mt-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Completion
                    </span>
                    <span className="text-[11px] font-black text-navy bg-slate-100 px-2 py-0.5 rounded-md">
                        {Math.round(task.progress || 0)}%
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={`h-full transition-all duration-700 ease-out rounded-full ${getStatusColor(
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
