import { ApolloError } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

interface LoginFormProps {
    formData: { identifier: string; password: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    loading: boolean;
    error: ApolloError | undefined;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Log In</h2>

                <div className="mb-4">
                    <label htmlFor="identifier" className="block text-gray-700 font-medium mb-2">Username/Email</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter username or email"
                        name="identifier"
                        id="identifier"
                        value={formData.identifier}
                        className="w-full px-3 py-2 border rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 text-white font-semibold rounded ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>


                {error && <p className="text-red-600 text-center mt-4">Error Logging in</p>}

            <p className='text-black py-2 w-full content-center'>Not a member? <Link href="/auth/register" className='text-gray-700 hover:text-indigo-600 hover:underline'>Register Now</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
