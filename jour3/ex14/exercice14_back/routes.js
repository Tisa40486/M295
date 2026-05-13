const User = require('./user')
const express = require("express");
const router = express.Router();
const authenticateUser = require("./middleware/authenticate")
const crypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    try {
        const input = new User(req.body);
        const hashedPassword = await crypt.hash(input.password, 10);
        input.password = hashedPassword;
        const user = await input.save();
        const userFind = await User.findOne({ email: input.email });

        res.json({
            message: "User created successfully",
            user: {
                email: userFind.email,
                firstname: userFind.firstname,
                lastname: userFind.lastname,
                role: userFind.role
            }
        });
        console.log("Post done succesfully");
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log({ message: err.message })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordValid = await crypt.compare(password, user.password);
        if (!user || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log({ message: err.message })
    }
});

router.get("/user/:userId", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "Invalid credentials" });
        }
        res.json({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/users/:userId", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const users = await User.find().then(users => {
            return users.map(user => ({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            }));
        });
        res.json({ user: users });
        console.log(users);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/user/:userId", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        Object.assign(user, req.body);
        await user.save();
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/user/:userId", authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        await User.findByIdAndDelete(req.params.userId);
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;