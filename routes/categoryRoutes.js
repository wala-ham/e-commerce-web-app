//Tout le monde peut voir les catégories, mais seul l'administrateur connecté peut les modifier ou en créer.

const express = require('express');
const router = express.Router();
// On importe toutes les fonctions du contrôleur de catégories
const { createCategory, getCategories, updateCategory, deleteCategory, getCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middelwares/auth');

// --- ROUTES PUBLIQUES ---
// GET -> http://localhost:3000/api/categories (Voir toutes les catégories)
router.get('/', getCategories);

// GET -> http://localhost:3000/api/categories/:id (Voir une catégorie spécifique)
router.get('/:id', getCategory);


// --- ROUTES ADMINISTRATEUR (Connexion + Rôle admin obligatoires) ---

// POST -> http://localhost:3000/api/categories (Créer une nouvelle catégorie)
router.post('/', protect, admin, createCategory);

// PUT -> http://localhost:3000/api/categories/:id (Mettre à jour une catégorie via son ID)
router.put('/:id', protect, admin, updateCategory);

// DELETE -> http://localhost:3000/api/categories/:id (Supprimer une catégorie via son ID)
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;