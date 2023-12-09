const crypto = require('crypto');

// Function to hash a password with salt using PBKDF2
const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
    console.log("Entered");
    const iterations = 10000; 
    const keylen = 64;
    const digest = 'sha512'; 
    const hashed = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
    console.log("hashed");
    return { hashed, salt };
};

// Function to verify a password against a hashed password
const verifyPassword = (enteredPassword, storedHash, salt) => {
    const iterations = 10000;
    const keylen = 64;
    const digest = 'sha512';

    const enteredHash = crypto.pbkdf2Sync(enteredPassword, salt, iterations, keylen, digest).toString('hex');
    return enteredHash === storedHash;
};


module.exports = {
    hashPassword,
    verifyPassword
}