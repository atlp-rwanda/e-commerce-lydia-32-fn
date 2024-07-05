import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://team-lydia-demo.onrender.com/api/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
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
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 transform hover:scale-105 transition duration-300">Reset your password</h2>
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
                <div className="mt-8 text-center">
                    <span className="text-sm text-gray-500">Still Remember Your Password? </span>
                    <a href="/login" className="text-sm text-blue-500 hover:text-blue-700 transition duration-300">Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
