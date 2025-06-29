
import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [uid, setUid] = useState(null)
    return (
        <UserContext.Provider value={{uid, setUid}}>
            {children}
        </UserContext.Provider>
    )    
}

export default UserContextProvider;