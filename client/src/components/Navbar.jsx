import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FiBell, FiLogOut, FiPlus, FiSearch, FiUser } from "react-icons/fi";

const Navbar = () => {
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
    const [hasNotifications] = useState(true);

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[60] shadow-sm gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-3 group cursor-pointer shrink-0" onClick={() => navigate("/")}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    T
                </div>
                <div className="hidden md:flex flex-col">
                    <h1 className="text-xl font-black text-navy tracking-tight leading-none">
                        Tasky
                    </h1>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">
                        Workspace
                    </span>
                </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-lg">
                <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2.5 border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all duration-300">
                    <FiSearch className="text-slate-400 mr-3 shrink-0" size={16} />
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 w-full"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 shrink-0">
                {/* Notification bell */}
                <button className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm transition-all duration-200">
                    <FiBell size={18} className="text-slate-600" />
                    {hasNotifications && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
                    )}
                </button>

                {/* User avatar */}
                <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
                    {user?.profileImageUrl ? (
                        <div className="relative group">
                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm relative">
                            <FiUser size={16} />
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-navy leading-none">{user?.name}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{user?.role}</span>
                    </div>
                </div>

                {/* New Task button */}
                {user?.role === "admin" && (
                    <button
                        onClick={() => navigate("/admin/create-task")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition-all duration-200"
                    >
                        <FiPlus size={16} />
                        <span className="hidden sm:inline">New Task</span>
                    </button>
                )}

                {/* Logout */}
                <button
                    onClick={logout}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group shadow-sm border border-transparent hover:border-red-100"
                    title="Logout"
                >
                    <FiLogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
