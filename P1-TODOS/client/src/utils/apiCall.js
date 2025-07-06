// Simple utility functions for localStorage management
const isAuthenticated = () => {
    const userData = localStorage.getItem('userData');
    return !!userData;
};

// Function to logout user
const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
};

export { isAuthenticated, logout };
export default isAuthenticated;
