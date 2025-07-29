import { useState } from "react"
import UserContext from "./UserContext"
import { useNavigate } from "react-router-dom";
import loginApi from "../api/loginApi";

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const login = async(data) => {
        const res = loginApi(data, setUser, setToken, navigate);
        if(res){
            console.log(res);
        }
    }

    const logout = async() => {
        setUser(null);  
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <UserContext.Provider value={{token, user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider