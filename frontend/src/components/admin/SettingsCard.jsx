import React from "react";

const SettingsCard = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default SettingsCard;