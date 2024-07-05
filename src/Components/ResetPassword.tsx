import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            toast.error('No reset token found. Please request a new password reset.');
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)) {
            toast.error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://team-lydia-demo.onrender.com/api/reset?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });


            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                toast.error(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error, please try again later');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">Reset Password</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            aria-label="Enter new password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${password ? 'w-full' : 'w-0'}`}></div>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            aria-label="Confirm new password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${confirmPassword ? 'w-full' : 'w-0'}`}></div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
