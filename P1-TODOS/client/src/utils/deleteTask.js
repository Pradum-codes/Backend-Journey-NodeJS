
const deleteTask = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/task/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);
        return result; // Return the deletion result
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error; // Re-throw so calling code can handle it
    }
}

export default deleteTask;