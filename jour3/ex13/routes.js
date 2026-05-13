const myUsers = require('./users');  
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post("/CreateUser", async (req, res) => {
    try {
        const { username, password, name, role } = req.body;
        
        const userExists = myUsers.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }
        
        const hashedPassword = await crypt.hash(password, 10);
        
        const newId = Math.max(...myUsers.map(u => u.id), 0) + 1;
        
        const newUser = {
            id: newId,
            name,
            username,
            password: hashedPassword,
            role: role || "user"
        };
        
        myUsers.push(newUser);
        
        res.json({ 
            message: "User created successfully", 
            user: { 
                id: newUser.id,
                username: newUser.username, 
                name: newUser.name, 
                role: newUser.role 
            } 
        });
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/ConnectUser", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = myUsers.find(u => u.username === username);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await crypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            "your_secret_key",
            { expiresIn: "24h" }
        );
        
        res.json({ 
            message: "Login successful",
            token: token,
            user: { username: user.username, name: user.name, role: user.role }
        });
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;