const express = require('express');
const router = express.Router();
// 1. AJOUT de "updateCartQuantity" dans l'importation ci-dessous
const { addToCart, updateCartQuantity, removeFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middelwares/auth');

// Toutes les routes du panier nécessitent d'être connecté
router.use(protect); 

// GET  -> http://localhost:3000/api/cart (Voir son panier)
router.get('/', getCart);

// POST -> http://localhost:3000/api/cart (Ajouter à la quantité existante)
router.post('/', addToCart);

// 2. AJOUT de la route PUT -> http://localhost:3000/api/cart (Mettre à jour / Écraser la quantité)
router.put('/:productId', updateCartQuantity);

// DELETE -> http://localhost:3000/api/cart/:productId (Supprimer un produit du panier)
router.delete('/:productId', removeFromCart);

module.exports = router;