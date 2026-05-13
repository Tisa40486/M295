const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: { 
            type: String,
            required: true,
            unique: true },
        password: { 
            type: String,
            required: true },
        firstname: { type: String },
        lastname: { type: String },
        role: { type: String },
    }
)   

module.exports = mongoose.model("User", userSchema);