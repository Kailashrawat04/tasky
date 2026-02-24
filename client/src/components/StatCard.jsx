import React from "react";

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} bg-opacity-10 text-xl font-bold`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
                    {title}
                </h4>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
            </div>
        </div>
    );
};

export default StatCard;
