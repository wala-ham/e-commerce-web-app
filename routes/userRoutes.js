const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/userController');
const { protect } = require('../middelwares/auth');
const { registerRules, loginRules, validate } = require('../middelwares/validator');

// Inscription (Validation des données -> Contrôleur)
router.post('/register', registerRules, validate, register);

// Connexion (Validation des données -> Contrôleur)
router.post('/login', loginRules, validate, login);

// Déconnexion
router.post('/logout', logout);

// Profil utilisateur (Vérification du Token JWT -> Contrôleur)
router.get('/profile', protect, getProfile);

module.exports = router;