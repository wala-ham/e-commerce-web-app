//Ici, on intègre le middleware Multer (upload.single('image'))
//  sur les routes de création et de modification pour intercepter le fichier envoyé depuis Postman
const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct,getProduct } = require('../controllers/productController');
const { protect, admin } = require('../middelwares/auth');
const upload = require('../middelwares/upload');

// Routes publiques
router.get('/', getProducts);
router.get('/:id', getProduct);

// Routes administrateurs (avec gestion de l'upload d'image)
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;