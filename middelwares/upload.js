const multer = require('multer');
const path = require('path');

// Définir où et comment stocker le fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Assurez-vous de créer ce dossier à la racine du projet
  },
  filename: function (req, file, cb) {
    // Génère un nom unique : date-nom_d_origine.extension
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtrer le type de fichier (uniquement des images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image !'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;