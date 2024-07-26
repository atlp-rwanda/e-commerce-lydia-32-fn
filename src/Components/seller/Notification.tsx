import React from "react";

const Notification: React.FC<{
  icon: string;
  message: string;
  time: string;
  status:boolean
}> = ({ icon, message, time,status }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
      <div className="flex items-center flex-grow">
        <span className="text-2xl mr-4 flex-shrink-0">{icon}</span>
        <div className="flex-grow">
          <p className= {!status?"font-bold":"font-light"}>{message}</p>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        
      </div>
    </div>
  );
};

export default Notification;
