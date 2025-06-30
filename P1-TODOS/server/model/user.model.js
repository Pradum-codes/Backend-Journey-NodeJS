const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passwordValidator = require('../utils/validator/password.validator');

const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { 
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function(password) {
                    return passwordValidator(password);
                },
                message: 'Password must be at least 8 characters long and contain uppercase, lowercase, and numeric characters without spaces'
            }
        }
    },{timestamps:true}
);

// Hash password before saving
userSchema.pre("save", async function(next) {
    const user = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
