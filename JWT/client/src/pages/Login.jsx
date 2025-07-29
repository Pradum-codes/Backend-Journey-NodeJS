import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {login} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        // if (formData.password.length < 6) {
        //     setError("Password must be at least 6 characters long.");
        //     return;
        // }
        console.log("Form submitted:", formData);
        await login(formData);
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600">Sign in to access your Contacts</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit} noValidate>
                        {error && (
                        <div
                            className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md"
                            role="alert"
                        >
                            {error}
                        </div>
                        )}

                        {/* Email Input */}
                        <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="Enter your email"
                                    aria-label="Email Address"
                                />
                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                            <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                placeholder="Enter your password"
                                aria-label="Password"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? (
                                    <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                    />
                                    </svg>
                                ) : (
                                    <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                    </svg>
                                )}
                            </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </span>
                        Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
