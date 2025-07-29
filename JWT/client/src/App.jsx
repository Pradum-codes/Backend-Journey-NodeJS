import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserContextProvider from "./context/UserContextProvider"
import Home from "./pages/Home"

function App() {
    
    return(
        <>
            <Router>
                <UserContextProvider>
                <Routes>
                    <Route 
                        path="/login"
                        element={<Login/>}
                        />
                    <Route 
                        path="/register"
                        element={<Register/>}
                        />
                    <Route 
                        path="/home"
                        element={<Home/>}
                        />
                </Routes>
                </UserContextProvider>
            </Router>
        </>
    )
}

export default App
