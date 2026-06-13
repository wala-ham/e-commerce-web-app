# 🛒 E-commerce API — Node.js / Express / MongoDB

API backend complète pour une plateforme e-commerce : authentification JWT, gestion des produits et catégories, panier, commandes, upload d'images, et architecture MVC.

---

## 📋 Fonctionnalités

- 🔐 **Authentification** : Register / Login / Logout avec JWT et mots de passe hashés (bcrypt)
- 👤 **Utilisateurs** : gestion du profil, rôles `user` / `admin`
- 🏷️ **Catégories** : CRUD complet (admin)
- 📦 **Produits** : CRUD complet (admin), upload d'image, pagination, recherche par nom, filtrage par catégorie
- 🛒 **Panier** : ajout, modification de quantité, suppression de produits
- 📋 **Commandes** : création depuis le panier, historique, gestion automatique du stock
- 🛡️ **Middlewares** : authentification JWT, contrôle des rôles, validation des données, gestion centralisée des erreurs

---

## 🛠️ Technologies

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** (jsonwebtoken) pour l'authentification
- **Bcrypt** pour le hashage des mots de passe
- **Multer** pour l'upload des images
- **express-validator** pour la validation des données

---

## 📁 Structure du projet

```
ecommerce-api/
├── config/
│   └── db.js               # Connexion MongoDB
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
├── middlewares/
│   ├── auth.js             # protect (JWT) + authorize (rôles)
│   ├── errorHandler.js      # gestion globale des erreurs
│   ├── upload.js            # configuration Multer
│   └── validate.js          # express-validator
├── uploads/                  # images uploadées
├── .env.example
├── server.js
└── package.json
```

---

## ⚙️ Installation

### 1. Cloner le repo

```bash
git clone https://github.com/wala-ham/e-commerce-web-app.git
cd ecommerce-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` en `.env` et adapter les valeurs :

```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```


### 4. Démarrer le serveur

```bash
# mode développement (avec nodemon)
nodemon server

```

Le serveur démarre sur `http://localhost:3000`.

---

## 📡 Endpoints de l'API

### 🔐 Auth (`/api/auth`)

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| POST | `/register` | Créer un compte | Public |
| POST | `/login` | Se connecter | Public |
| POST | `/logout` | Se déconnecter | Privé |
| GET | `/me` | Profil utilisateur | Privé |

### 🏷️ Catégories (`/api/categories`)

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| GET | `/` | Liste des catégories | Public |
| GET | `/:id` | Détail d'une catégorie | Public |
| POST | `/` | Créer une catégorie | Admin |
| PUT | `/:id` | Modifier une catégorie | Admin |
| DELETE | `/:id` | Supprimer une catégorie | Admin |

### 📦 Produits (`/api/products`)

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| GET | `/` | Liste (pagination, recherche, filtre) | Public |
| GET | `/:id` | Détail d'un produit | Public |
| POST | `/` | Créer un produit + image | Admin |
| PUT | `/:id` | Modifier un produit | Admin |
| DELETE | `/:id` | Supprimer un produit | Admin |

**Query params disponibles sur `GET /api/products` :**
- `page`, `limit` → pagination
- `search` → recherche par titre
- `category` → filtrage par ID de catégorie

### 🛒 Panier (`/api/cart`)

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| GET | `/` | Voir mon panier | Privé |
| POST | `/` | Ajouter un produit | Privé |
| PUT | `/:productId` | Modifier la quantité | Privé |
| DELETE | `/:productId` | Retirer un produit | Privé |

### 📋 Commandes (`/api/orders`)

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| POST | `/` | Créer une commande depuis le panier | Privé |
| GET | `/` | Historique (toutes pour admin) | Privé |
| GET | `/:id` | Détail d'une commande | Privé |
| PUT | `/:id/status` | Changer le statut | Admin |

---

## 🔑 Authentification

Toutes les routes privées nécessitent un header :

```
Authorization: Bearer <token>
```

Le token est renvoyé lors du `register` ou du `login`.

---

## 🧪 Tester avec Postman

Une collection d'exemples de requêtes est disponible dans [`POSTMAN.md`](./POSTMAN.md) (body, headers, form-data pour l'upload d'image, etc.).

---

## 📝 Modèle de données (résumé)

- **User** → name, email, password, role, createdAt
- **Category** → name, description
- **Product** → title, description, price, stock, image, category (ref `Category`)
- **Cart** → user (ref `User`), products: [{ product, quantity }]
- **Order** → user (ref `User`), products: [{ product, quantity, price }], totalPrice, status

---

## 👩‍💻 Auteur

Projet réalisé dans le cadre d'un exercice récapitulatif backend Node.js / Express / MongoDB.
