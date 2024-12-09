import React from "react";

interface RegisterFormProps {
    formData: { 
        firstName: string; 
        lastName: string; 
        email: string; 
        username: string; 
        password: string; 
        role: string; 
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    loading: boolean;
    error: any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.firstName}
                        placeholder="Enter Your First Name"
                        onChange={handleChange}
                        name="firstName"
                        id="firstName"
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.lastName}
                        placeholder="Enter Your Last Name"
                        onChange={handleChange}
                        name="lastName"
                        id="lastName"
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.username}
                        placeholder="Create a Username"
                        onChange={handleChange}
                        name="username"
                        id="username"
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        placeholder="Enter your Email Address"
                        onChange={handleChange}
                        name="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        placeholder="Create a Strong Password"
                        onChange={handleChange}
                        name="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* If you're using the 'role' field, you can expose it as a hidden or selectable input.
                    For now, let's make it a simple hidden input or a normal text input if required. */}
                <input
                    type="hidden"
                    name="role"
                    value="user"
                />

                <button 
                    disabled={loading} 
                    type="submit" 
                    className={`w-full py-2 text-white font-semibold rounded ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                {error && <p className="text-red-600 text-center mt-4">Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
