import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import UserContextProvider from "./context/UserContextProvider";
import Signup from "./pages/Signup";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user data exists in localStorage
        const userData = localStorage.getItem('userData');
        setIsAuth(!!userData);
        setIsLoading(false);
    }, []);

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route 
                        path="/login" 
                        element={isAuth ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuth}/>} 
                    />
                    <Route 
                        path="/" 
                        element={isAuth ? <Home setIsAuthenticated={setIsAuth} /> : <Navigate to="/login" />} 
                    />
                     <Route 
                        path="/signup" 
                        element={<Signup setIsAuthenticated={setIsAuth}/>} 
                    />
                </Routes>
            </Router>
        </UserContextProvider>
    )
}

export default App
