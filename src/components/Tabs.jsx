import React, { useState } from "react";

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("Today");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {["Today", "Pending", "Overdue"].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === tab ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;