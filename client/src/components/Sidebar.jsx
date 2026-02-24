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
        </div>
    );
};

export default Sidebar;
