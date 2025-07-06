
async function fetchTask(uid, token) {
    try {
        const response = await fetch(`http://localhost:3000/task/get?uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        
        if (response.status === 401) {
            // Token is invalid or expired
            const error = new Error('Invalid or expired token');
            error.status = 401;
            throw error;
        }
        
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Fetch tasks error:', error);
        throw error; // Re-throw so caller can handle the error
    }
}

export default fetchTask;