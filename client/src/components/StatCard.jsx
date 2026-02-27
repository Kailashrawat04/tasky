import React from "react";

const badgeStyles = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
};

const StatCard = ({ title, value, icon, color, badge }) => {
    return (
        <div className="stat-card group hover:-translate-y-1 transition-all duration-300 relative">
            {/* Badge */}
            {badge && (
                <span
                    className={`absolute top-5 right-5 text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeStyles[badge.color] || "bg-slate-100 text-slate-500"}`}
                >
                    {badge.label}
                </span>
            )}

            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-2xl font-black shadow-inner group-hover:scale-110 transition-transform duration-300`}
            >
                {icon}
            </div>
            <div className="mt-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
                    {title}
                </h4>
                <div className="text-3xl font-black text-navy">{value}</div>
            </div>
        </div>
    );
};

export default StatCard;
