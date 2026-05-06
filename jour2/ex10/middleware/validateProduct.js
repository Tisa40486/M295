function validateProduct(req, res, next) {
  const { nom, prix, quantite } = req.body;

  if (!nom) {
    return res.status(400).json({ message: "Le nom est requis." });
  }

  if (prix < 0) {
    return res.status(400).json({ message: "Le prix doit être un nombre positif." });
  }

  if (!Number.isInteger(quantite) || quantite < 0) {
    return res.status(400).json({ message: "La quantité doit être un nombre entier positif." });
  }

  next();
}

module.exports = validateProduct;