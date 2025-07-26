const User = require('../models/user.model');
const generateToken = require('../utils/generate.token');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Password Not Valid" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error("Error logging in: ", err);
        res.status(400).json({
            message: 'Error logging in',
            error: err
        });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ 
            name, 
            email,
            password,
            profileImage: `https://robohash.org/${newUser._id}`,
        });
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profileImage,
            }
        });
    } catch (err) {
        console.error("Error registering the user", err);
        res.status(400).json({
            message: 'Error registering the user',
            error: err
        });
    }
};

const profile = async (req,res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        res.status(201).json({
            name: user.name,
            email: user.email,
            profileImage: user.profileImage
        })
    } catch (err) {
        console.error("Error registering the user", err);
        res.status(400).json({
            message: 'Error Getting User Profile',
            error: err
        });
    }
}

module.exports = {
    login,
    register,
    profile,
};
