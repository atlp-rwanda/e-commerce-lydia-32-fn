import React from "react";

const Notification: React.FC<{
  icon: string;
  message: string;
  time: string;
}> = ({ icon, message, time }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex items-center flex-grow">
        <span className="text-2xl mr-4 flex-shrink-0">{icon}</span>
        <div className="flex-grow">
          <p className="font-semibold">{message}</p>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
      </div>
      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded flex-shrink-0">
        Read
      </button>
    </div>
  );
};

export default Notification;
