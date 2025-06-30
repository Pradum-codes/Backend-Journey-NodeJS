const passwordValidator = (password) => {
    // Check for whitespace characters
    if (password.includes(" ") || password.includes("\n") || password.includes("\t")) {
        return false;
    }
    
    // Check minimum length
    if (password.length < 8) {
        return false;
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
        return false;
    }
    
    return true;
}

module.exports = passwordValidator;