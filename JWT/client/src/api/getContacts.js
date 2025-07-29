
const getContact = async (token, user) => {
    try {
        console.log("Contacts API Called");
        const response = await fetch("http://localhost:3000/api/contact/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Bearer" : `${token}`
            },
            body: JSON.stringify(user),
        });


        const res = await response.json();
        console.log(res);
        if (response.ok && res.token && res.user) {
            localStorage.setItem("token", res.token);
            return res;
        }
        throw new Error(res.message || "Login failed");
    } catch (err) {
        console.log("Error getting contacts", err);
    }
}

export default getContact;