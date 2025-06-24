const express = require('express');
const connectDb = require('./connectDb');

const app = express();

app.get("/", async (req, res) => {
    try {
        console.log("Trying to connect to MongoDB");
        await connectDb(); // assuming connectDb returns a promise
        res.status(200).send("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        res.status(500).send("Error connecting to MongoDB");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});