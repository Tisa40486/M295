const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + './public'));


app.get('/', (req,res) => {
    res.sendFile('index.html', 
        {
            root: __dirname + '/public'
        });
})


app.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
});