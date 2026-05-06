const mongoose = require("mongoose");
const productSchema = require('./product')
const Product = mongoose.model("Product", productSchema)
mongoose.connect('mongodb://myAdmin:1234@127.0.0.1:27017/?authSource=admin').then(() => console.log("Connected")).catch(err => console.error(err));

async function main (){
    const products = [
        { nom: "Fraise", description: "Fruit", prix: 15, quantityStock: 25 },
        { nom: "Banane", description: "Fruit", prix: 18, quantityStock: 30 },
        { nom: "Tomates", description: "Legumes", prix: 12, quantityStock: 22 }
    ];
    products.insertMany();
    const product = await products.find();
    console.log(product);
}

main();