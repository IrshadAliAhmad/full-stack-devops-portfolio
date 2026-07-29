import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-teal-500 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
          <Icon size={28} className="text-teal-400 group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;