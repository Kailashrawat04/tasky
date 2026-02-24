import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StatCard from "../../components/StatCard";
import TaskCard from "../../components/TaskCard";
import { FiBox, FiClock, FiCheckSquare, FiAlertCircle } from "react-icons/fi";
import { useUserContext } from "../../context/UserContext";

const UserDashboard = () => {
  const { user } = useUserContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { statistics, recentTasks } = data || {};

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">
            Hello, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Here's a look at your personal workspace and task progress.
          </p>
        </div>
        <button className="btn-primary !w-auto">
          View My Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Tasks"
          value={statistics?.totalTasks || 0}
          icon={<FiBox />}
          color="text-slate-600 bg-slate-100"
        />
        <StatCard
          title="To Do"
          value={statistics?.pendingTasks || 0}
          icon={<FiClock />}
          color="text-amber-600 bg-amber-100"
        />
        <StatCard
          title="Completed"
          value={statistics?.completedTasks || 0}
          icon={<FiCheckSquare />}
          color="text-emerald-600 bg-emerald-100"
        />
        <StatCard
          title="Overdue"
          value={statistics?.overdueTasks || 0}
          icon={<FiAlertCircle />}
          color="text-rose-600 bg-rose-100"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-black text-navy text-xl">Your Focus Tasks</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Priority for today</p>
          </div>
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all">
            Manage All
          </button>
        </div>

        {recentTasks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="glass-card border-dashed border-2 border-slate-200 rounded-3xl p-16 text-center animate-pulse">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/30">
              <FiBox size={40} />
            </div>
            <h4 className="text-xl font-bold text-navy">Clear skies! No tasks here.</h4>
            <p className="text-slate-400 font-medium mt-2 max-w-sm mx-auto">
              You've cleared your assigned tasks for now. Enjoy the breather or check with your lead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;