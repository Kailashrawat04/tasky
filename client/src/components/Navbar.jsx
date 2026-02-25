import React from "react";
import { useUserContext } from "../context/UserContext";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
    const { user, logout } = useUserContext();

    return (
        <nav className="flex items-center justify-between px-10 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[60] shadow-sm">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    T
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-black text-navy tracking-tight leading-none">
                        Tasky
                    </h1>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">Workspace</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
                    <FiUser className="text-slate-400 mr-2" />
                    <input type="text" placeholder="Search tasks..." className="bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 w-48" />
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-navy leading-none">
                            {user?.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                            {user?.role}
                        </span>
                    </div>
                    {user?.profileImageUrl ? (
                        <div className="relative group">
                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm relative group">
                            <FiUser size={18} className="group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                    )}
                </div>

                <button
                    onClick={logout}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group shadow-sm border border-transparent hover:border-red-100"
                    title="Logout"
                >
                    <FiLogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
