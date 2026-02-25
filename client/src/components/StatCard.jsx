import React from "react";

const StatCard = ({ title, value, icon, color }) => {
    return (
<<<<<<< HEAD
        <div className="stat-card group hover:-translate-y-1 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-2xl font-black shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="mt-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
                    {title}
                </h4>
                <div className="text-3xl font-black text-navy">{value}</div>
=======
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} bg-opacity-10 text-xl font-bold`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
                    {title}
                </h4>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
>>>>>>> 42afac2100ca4fe80777534ebf338c9675773b58
            </div>
        </div>
    );
};

export default StatCard;
