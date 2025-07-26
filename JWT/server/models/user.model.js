const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    profileImage: {
        type: String,
        default: 'https://robohash.org/profile'
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPass = await bcrypt.hash(this.password, 10);
        this.password = hashedPass;
        next();
    } catch (err) {
        console.error("Error hashing the password", err);
        next(err); // ✅ propagate error
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
