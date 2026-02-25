import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import {
    FiGrid,
    FiList,
    FiUsers,
    FiPlusSquare,
    FiCheckCircle,
} from "react-icons/fi";

const Sidebar = () => {
    const { user } = useUserContext();
    const location = useLocation();

    const adminLinks = [
        { label: "Dashboard", icon: <FiGrid size={20} />, path: "/admin/dashboard" },
        { label: "Manage Tasks", icon: <FiList size={20} />, path: "/admin/tasks" },
        { label: "Create Task", icon: <FiPlusSquare size={20} />, path: "/admin/create-task" },
        { label: "Manage Users", icon: <FiUsers size={20} />, path: "/admin/users" },
    ];

    const userLinks = [
        { label: "Dashboard", icon: <FiGrid size={20} />, path: "/user/user-dashboard" },
        { label: "My Tasks", icon: <FiCheckCircle size={20} />, path: "/user/My-tasks" },
    ];

    const links = user?.role === "admin" ? adminLinks : userLinks;

    return (
<<<<<<< HEAD
        <div className="w-68 h-[calc(100vh-73px)] bg-navy py-8 px-4 flex flex-col gap-2 sticky top-[73px] shadow-2xl z-40">
            <div className="px-6 mb-6 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Main Menu
            </div>
            <div className="flex flex-col gap-1">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={isActive ? "sidebar-link-active" : "sidebar-link"}
                        >
                            <span className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}>
                                {link.icon}
                            </span>
                            <span className="font-semibold tracking-wide">{link.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto px-6 py-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name?.[0] || "U"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white truncate w-32">{user?.name || "User"}</span>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{user?.role}</span>
                    </div>
                </div>
            </div>
=======
        <div className="w-64 h-[calc(100vh-73px)] bg-white border-r border-slate-200 py-6 px-4 flex flex-col gap-2 sticky top-[73px]">
            <div className="px-4 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Main Menu
            </div>
            {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                            }`}
                    >
                        <span className={`${isActive ? "" : "group-hover:scale-110 transition-transform"}`}>
                            {link.icon}
                        </span>
                        <span className="font-medium">{link.label}</span>
                    </Link>
                );
            })}
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
        </div>
    );
};

export default Sidebar;
