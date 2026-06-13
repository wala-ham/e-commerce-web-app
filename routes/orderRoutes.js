const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory, getOrders, getOrder, updateOrderStatus  } = require('../controllers/orderController');
const { protect, admin } = require('../middelwares/auth');

// Toutes les routes de commandes nécessitent d'être connecté
router.use(protect);

// POST -> http://localhost:3000/api/orders (Valider le panier et créer la commande)
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', admin, updateOrderStatus);
// GET  -> http://localhost:3000/api/orders/history (Consulter son historique de commandes)
router.get('/history', getOrderHistory);

module.exports = router;