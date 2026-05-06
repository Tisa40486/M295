const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes")

const app = express();  
mongoose.connect('mongodb://myAdmin:1234@127.0.0.1:27017/test?authSource=admin');

const db = mongoose.connection;

db.on("error", (error)=> console.log(error))
db.once("open", () => console.log("success connected"));

app.use(bodyParser.json())

app.use("/products", router)

app.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
}); 