import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdatePasswordMutation } from '../slices/authSlice/authApiSlice';
import { clearCredentials } from '../slices/authSlice/authSlice';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [updatePassword] = useUpdatePasswordMutation();

  useEffect(() => {
    if (!userInfo || !userInfo.passwordExpired) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      toast.success('Password updated successfully');
      dispatch(clearCredentials());
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;