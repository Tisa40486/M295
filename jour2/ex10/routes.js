const productSchema = require('./product')
const express = require("express");
const router = express.Router();
const validateProduct = require("./middleware/validateProduct")

router.post("/", validateProduct, (req,res) => {
    try{
        const input = new productSchema(req.body);
        const products = await input.save();
        res.json(products);
        console.log("Post done succesfully");
    }
    catch(err){
        res.status(500).json({message : err.message})
        console.log({message : err.message})
    }
});

router.put("/:id", validateProduct, (req, res) => {
    try {
        const product = await productSchema.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.body.nom != null) {
            product.nom = req.body.nom;
        }

        if (req.body.description != null) {
            product.description = req.body.description;
        }

        if (req.body.prix != null) {
            product.prix = req.body.prix;
        }

        if (req.body.quantityStock != null) {
            product.quantityStock = req.body.quantityStock;
        }

        const updatedProduct = await product.save();
        
        res.json(updatedProduct);
        console.log("Update done succesfully");

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router