
const postTask = async (data) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:3000/task/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            // Token is invalid or expired
            const error = new Error('Invalid or expired token');
            error.status = 401;
            throw error;
        }

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);
        return result; // Return the created task with _id
    } catch (error) {
        console.error("Error posting task:", error);
        throw error; // Re-throw so calling code can handle it
    }
}

export default postTask