require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const router = require("./routes")
const crypt = require('bcrypt');
const cors = require("cors");

const app = express();  

app.use(cors({
  origin: 'http://localhost:3001', // front
  credentials: true
}));

// mongoose.connect('mongodb://myAdmin:1234@127.0.0.1:27017/MyUsersDb?authSource=admin');
mongoose.connect('mongodb://myAdmin:1234@127.0.0.1:27017/MyUsersDB?authSource=admin');

const db = mongoose.connection;

db.on("error", (error)=> console.log(error))
db.once("open", () => console.log("success connected"));

app.use(express.json())

app.use(router)

app.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
}); 
