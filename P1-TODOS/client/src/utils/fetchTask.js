
async function fetchTask(uid) {
    try{
        const response = await fetch(`http://localhost:3000/task/get?uid=${uid}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
        throw error; // Re-throw so caller can handle the error
    }
}

export default fetchTask;