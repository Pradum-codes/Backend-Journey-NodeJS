import { useContext } from "react";
import UserContext from "../context/UserContext";

function Home() {
    const { user } = useContext(UserContext);

    return (
        <div className="flex items-center justify-center min-h-screen text-2xl">
            <div>
                <p>HomePage</p>
                {user ? (
                    <div className="m-1 text-green-600">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading user...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
