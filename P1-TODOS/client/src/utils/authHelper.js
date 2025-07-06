// Helper function to handle authentication errors
export const handleAuthError = (error, clearUser, setIsAuthenticated, navigate) => {
    if (error.status === 401) {
        console.log("Invalid token, redirecting to login");
        clearUser(); // Clear user context and localStorage
        setIsAuthenticated(false); // Update App component state
        navigate('/login');
        return true; // Indicates that auth error was handled
    }
    return false; // Not an auth error
};

// Helper function to check if response has auth error
export const checkAuthResponse = async (response) => {
    if (response.status === 401) {
        const error = new Error('Invalid or expired token');
        error.status = 401;
        throw error;
    }
    return response;
};
