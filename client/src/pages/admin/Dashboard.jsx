import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StatCard from "../../components/StatCard";
import TaskCard from "../../components/TaskCard";
import {
  FiBox,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiPlusSquare,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { statistics, charts, recentTasks } = data || {};

  const distributionData = [
    { name: "Pending", value: charts?.taskDistribution?.pending || 0 },
    { name: "In Progress", value: charts?.taskDistribution?.["in-progress"] || 0 },
    { name: "Completed", value: charts?.taskDistribution?.completed || 0 },
  ];

  const priorityData = [
    { name: "Low", value: charts?.taskPriorityLevels?.low || 0 },
    { name: "Medium", value: charts?.taskPriorityLevels?.medium || 0 },
    { name: "High", value: charts?.taskPriorityLevels?.high || 0 },
  ];

  const COLORS = ["#94a3b8", "#1368EC", "#10b981"];
  const PRIORITY_COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-black text-navy tracking-tight">Overview</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm">
          Here's a summary of the workspace activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={statistics?.totalTasks || 0}
          icon={<FiBox />}
          color="text-slate-600 bg-slate-100"
          badge={{ label: "+12%", color: "green" }}
        />
        <StatCard
          title="Pending"
          value={statistics?.pendingTasks || 0}
          icon={<FiClock />}
          color="text-amber-600 bg-amber-100"
          badge={{ label: "Active", color: "yellow" }}
        />
        <StatCard
          title="Completed"
          value={statistics?.completedTasks || 0}
          icon={<FiCheckCircle />}
          color="text-emerald-600 bg-emerald-100"
          badge={{ label: "Done", color: "blue" }}
        />
        <StatCard
          title="Overdue"
          value={statistics?.overdueTasks || 0}
          icon={<FiAlertCircle />}
          color="text-rose-600 bg-rose-100"
          badge={{ label: "Urgent", color: "red" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Distribution Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiTrendingUp size={20} />
              </div>
              <h3 className="font-black text-navy text-lg">Workload Analysis</h3>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1.5 outline-none">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(19, 104, 236, 0.05)' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="value" fill="#1368EC" radius={[8, 8, 0, 0]} barSize={45}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="font-black text-navy text-lg mb-8">Priority Mix</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '700' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-black text-navy text-xl">Recent Tasks</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Latest assignments</p>
          </div>
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all">
            View Workspace
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentTasks?.map((task) => (
            <TaskCard key={task._id} task={task} isAdmin={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;