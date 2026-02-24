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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Hello, {user?.name}!
        </h1>
        <p className="text-slate-500 mt-1">
          Here's a look at your tasks and progress.
        </p>
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Your Recent Tasks</h3>
          <button className="text-sm font-medium text-primary hover:underline">
            View All
          </button>
        </div>

        {recentTasks?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FiBox size={32} />
            </div>
            <h4 className="text-lg font-medium text-slate-900">No tasks assigned yet</h4>
            <p className="text-slate-500 mt-1">
              Check back later or contact your administrator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;