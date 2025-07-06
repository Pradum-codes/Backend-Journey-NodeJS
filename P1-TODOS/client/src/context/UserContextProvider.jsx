
import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [uid, setUid] = useState(null);
    const [user, setUser] = useState(null);

    // Load user data from localStorage on component mount
    useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    console.log("Loaded from storage:", savedUser);
    
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        console.log("Parsed user data:", userData);
        setUser(userData);
        setUid(userData._id || userData.id); // or userData._id
    }
    }, []);


    // Update localStorage when user data changes
    const updateUser = (userData) => {
        setUser(userData);
        setUid(userData.id);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Clear user data
    const clearUser = () => {
        setUser(null);
        setUid(null);
        localStorage.removeItem('userData');
    };

    return (
        <UserContext.Provider value={{
            uid, 
            setUid, 
            user, 
            setUser: updateUser,
            clearUser
        }}>
            {children}
        </UserContext.Provider>
    )    
}

export default UserContextProvider;