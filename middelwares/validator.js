const { body, validationResult } = require('express-validator');

// 1. Règles pour l'Inscription (Register)
const registerRules = [
  body('name')
    .notEmpty().withMessage("Le nom est obligatoire")
    .trim(),
  body('email')
    .isEmail().withMessage("Veuillez fournir un email valide")
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères")
];

// 2. Règles pour la Connexion (Login)
const loginRules = [
  body('email').isEmail().withMessage("Veuillez fournir un email valide"),
  body('password').notEmpty().withMessage("Le mot de passe est obligatoire")
];

// 3. Le Middleware qui analyse le résultat des règles ci-dessus
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si express-validator trouve des erreurs, on stoppe la requête ici
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }
  next(); // Sinon, on passe au contrôleur
};

module.exports = {
  registerRules,
  loginRules,
  validate
};