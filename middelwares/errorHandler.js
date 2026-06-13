const errorHandler = (err, req, res, next) => {
  // Par défaut, si le statut n'est pas défini, on met 500 (Erreur Serveur)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Gestion des erreurs spécifiques à MongoDB / Mongoose
  
  // 1. Erreur de Cast (ex: ID MongoDB invalide dans l'URL)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = "Ressource non trouvée (ID invalide)";
  }

  // 2. Erreur de Doublon (ex: Email déjà existant en BDD)
  if (err.code === 11000) {
    statusCode = 400;
    message = `Valeur dupliquée pour le champ : ${Object.keys(err.keyValue)}. Veuillez en choisir une autre.`;
  }

  // 3. Erreurs de Validation Mongoose (ex: Champs requis manquants)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  res.status(statusCode).json({
    message: message,
    // On affiche la pile d'erreur (stack) uniquement en mode développement pour vous aider à débugger
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;