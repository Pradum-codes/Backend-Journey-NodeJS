const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')

const getUsers = async (req, res) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email }).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user); // includes _id (userId)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        
        const user = new User({ name, email, password });
        const token = generateToken(user._id);
        await user.save();
        
        // Don't send password in response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json({ 
            message: 'User created successfully',
            user: userResponse,
            token: token, 
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(400).json({ error: 'Failed to create user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        // Return user info without password
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: token,
        });
    } catch (error) {
        console.log("Login Error: ", error);
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = {
    getUsers,
    createUser,
    loginUser,
};
