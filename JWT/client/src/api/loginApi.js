const loginApi = async (data, setUser, setToken, navigate) => {
    try {
        console.log("Login API Called");
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });


        const res = await response.json();
        console.log(res);
        if (response.ok && res.token && res.user) {
            setUser(res.user);
            setToken(res.token);
            localStorage.setItem("token", res.token);
            navigate("/home");
            return res;
        }


        throw new Error(res.message || "Login failed");
    } catch (err) {
        console.error("Login API Error:", err.message);
        return null;
    }
};

export default loginApi;
