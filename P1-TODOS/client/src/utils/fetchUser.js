
const fetchUser = async (payload) => {
    try {
        const response = await fetch(`http://localhost:3000/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log("Login response:", data);
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        return data;
    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
}

export default fetchUser