import React from "react";
import { useUserContext } from "../context/UserContext";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
    const { user, logout } = useUserContext();

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                    T
                </div>
                <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                    Tasky
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-slate-900 leading-none">
                            {user?.name}
                        </span>
                        <span className="text-xs text-slate-500 capitalize leading-none mt-1">
                            {user?.role}
                        </span>
                    </div>
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                            <FiUser size={20} />
                        </div>
                    )}
                </div>

                <button
                    onClick={logout}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Logout"
                >
                    <FiLogOut size={20} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
