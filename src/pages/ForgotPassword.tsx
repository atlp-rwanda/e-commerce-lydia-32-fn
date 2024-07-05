import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCredentials } from '../slices/authSlice/authSlice';
import { useLoginTwoFaMutation } from '../slices/authSlice/authApiSlice';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [is2FARequired, setIs2FARequired] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login2FA] = useLoginTwoFaMutation();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();

            if (response.ok) {
                if (data.message === "2FA code sent to your email") {
                    setIs2FARequired(true);
                    toast.success('2FA code sent to your email');
                } else {
                    toast.success(data.message);
                }
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

    const handleSubmit2FA = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await login2FA({ twoFactorCode }).unwrap();
            dispatch(getCredentials({ ...res }));
            toast.success('2FA verification successful!');
            navigate('/');
        } catch (err: any) {
            console.error(err);
            if (err?.data?.message) {
                toast.error(err.data.message);
            } else if (err.status === 401) {
                toast.error('Incorrect 2FA code');
            } else {
                toast.error('An error occurred. Please try again later');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">
                    Reset your password
                </h2>
                {!is2FARequired ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                aria-label="Enter your email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <div className={`absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${email ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Reset Password'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit2FA} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter 2FA Code"
                                value={twoFactorCode}
                                onChange={(e) => setTwoFactorCode(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify 2FA Code'}
                        </button>
                    </form>
                )}
                <div className="mt-8 text-center">
                    <span className="text-sm text-gray-500">Still Remember Your Password? </span>
                    <a href="/login" className="text-sm text-blue-500 hover:text-blue-700 transition duration-300">Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;