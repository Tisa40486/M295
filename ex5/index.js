const express = require('express');
const app = express();
const myMiddleware = require('../ex4/custom-middleware');
const items = [
    { id: 1, name: "John Doe" }
];

app.use(express.json());

app.get('/items', (req,res) => {
    res.status(200).json(items) 
})

app.post("/items", (req, res) => {
    const { name } = req.body;
    const newItem = {
        id: items.length + 1,
        name: name
    };

    items.push(newItem);
    res.status(200).json(newItem);
});

app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    item.name = name;

    res.status(200).json(item);
});

app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    items.splice(index, 1);

    res.status(200).json({
        message: "Item deleted"
    });
}); 

app.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
});

//faire les insert de ce style 
// {
//   "name": "Adam"
// }