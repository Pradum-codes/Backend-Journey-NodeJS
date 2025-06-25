const express = require('express');
const app = express();
const connectDb = require('./db/connectDb');
const User = require('./models/model.user');

app.use(express.json());
connectDb();

// Create Users
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Read Users
app.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200);
    res.json(users);
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});