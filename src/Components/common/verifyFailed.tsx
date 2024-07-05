import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerificationFailedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const messageFromUrl = searchParams.get("message");
    if (messageFromUrl) {
      setMessage(decodeURIComponent(messageFromUrl));
    } else {
      setMessage("Email verification status unknown.");
    }
  }, [location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg">Email Verification Failed</h3>
          <p className="py-4">{message}</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            Go to Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationFailedPage;
