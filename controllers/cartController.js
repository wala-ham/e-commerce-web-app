const Cart = require('../models/Cart');

// 1. AJOUTER UN PRODUIT OU MODIFIER SA QUANTITÉ DANS LE PANIER
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Trouver le panier de l'utilisateur ou en créer un s'il n'existe pas
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Vérifier si le produit est déjà dans le panier
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      // Le produit existe déjà, on ajuste la quantité
      cart.products[productIndex].quantity += Number(quantity);
    } else {
      // Le produit n'existe pas, on l'ajoute au tableau
      cart.products.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error); // Passe l'erreur au middleware global d'erreurs
  }
};

// 2. SUPPRIMER UN PRODUIT DU PANIER
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      res.status(404);
      return next(new Error("Panier introuvable"));
    }

    // Filtrer pour retirer le produit spécifié
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// 3. OBTENIR LE PANIER DE L'UTILISATEUR (Optionnel mais très utile pour Postman)
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product', 'title price image');
    if (!cart) {
      return res.json({ user: req.user.id, products: [] });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.updateCartQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: 'Panier introuvable' });

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === req.params.productId
    );

    if (itemIndex === -1) return res.status(404).json({ message: 'Produit non trouvé dans le panier' });

    if (quantity <= 0) {
      // Supprimer le produit si quantité <= 0
      cart.products.splice(itemIndex, 1);
    } else {
      cart.products[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('products.product', 'title price image');
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};