const registerUser = async (payload) => {
    try {
        const response = await fetch(`http://localhost:3000/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        console.log("Registration response:", data);
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        return data;
    } catch (error) {
        console.log("Registration error:", error);
        throw error;
    }
}

export default registerUser;
