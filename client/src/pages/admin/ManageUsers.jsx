import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FiTrash2, FiEdit2, FiSearch, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(API_PATHS.USERS.DELETE_USER(userId));
        toast.success("User removed successfully");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Manage Users</h1>
          <p className="text-slate-500 font-medium mt-1">
            Browse and organize all registered workspace personnel.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-sm font-medium placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card rounded-[32px] border-none shadow-2xl shadow-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Personnel
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Permission Level
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Task Load
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-all duration-300 group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      {user.profileImageUrl ? (
                        <div className="relative">
                          <img
                            src={user.profileImageUrl}
                            alt=""
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm relative group-hover:bg-white transition-colors">
                          <FiUser size={24} />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                        </div>
                      )}
                      <div>
                        <div className="font-black text-navy text-sm">
                          {user.name}
                        </div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${user.role === "admin"
                        ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                        : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <p className="text-xs font-black text-amber-600 leading-none">{user.pendingTasks || 0}</p>
                        <p className="text-[8px] font-black text-slate-400 mt-1">PEN</p>
                      </div>
                      <div className="w-[1px] h-6 bg-slate-100" />
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <p className="text-xs font-black text-primary leading-none">{user.inProgressTasks || 0}</p>
                        <p className="text-[8px] font-black text-slate-400 mt-1">PRG</p>
                      </div>
                      <div className="w-[1px] h-6 bg-slate-100" />
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <p className="text-xs font-black text-emerald-600 leading-none">{user.completedTasks || 0}</p>
                        <p className="text-[8px] font-black text-slate-400 mt-1">FIN</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all shadow-sm border border-transparent hover:border-primary/10">
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <FiUser size={40} />
            </div>
            <h4 className="text-xl font-black text-navy">No Personnel Found</h4>
            <p className="text-slate-400 font-medium mt-2">Try adjusting your search criteria or add new members.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;