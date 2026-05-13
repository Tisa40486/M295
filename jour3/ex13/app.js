const express = require("express");
const router = require("./routes")

const app = express();  

app.use(express.json())

app.use("/users", router)

app.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
});