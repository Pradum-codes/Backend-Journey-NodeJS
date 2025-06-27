const User = require('../model/user.model');

const getUsers = async (req, res) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user); // includes _id (userId)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  getUsers,
  createUser,
};
