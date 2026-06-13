const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Vérifier si l'utilisateur est connecté (Possède un token valide)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_cle_secrete');
      
      // On récupère l'utilisateur (sans le mot de passe) et on l'injecte dans la requête
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Non autorisé, aucun token fourni" });
  }
};

// Vérifier si l'utilisateur est un Administrateur
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé, réservé aux administrateurs" });
  }
};

module.exports = { protect, admin };