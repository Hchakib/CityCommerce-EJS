const express = require('express');
const router = express.Router();
const cartController = require('../Contrôleurs/CartController');

// Ajouter un produit au panier
router.post('/add', cartController.addToCart);

// Afficher le panier
router.get('/', cartController.viewCart);

// Supprimer un article du panier
router.post('/remove', cartController.removeFromCart);

// Vider le panier
router.post('/clear', cartController.clearCart);

module.exports = router;
