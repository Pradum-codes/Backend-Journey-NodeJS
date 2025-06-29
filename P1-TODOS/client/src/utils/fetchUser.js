
const fetchUser = async (email) => {
    try {
        const response = await fetch(`http://localhost:3000/user/get?email=${email}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch( error ) {
        console.log(error);
        throw error;
    }
}

export default fetchUser