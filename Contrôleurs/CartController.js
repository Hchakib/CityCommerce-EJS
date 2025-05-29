const Product = require('../Modèles/Product');

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Produit introuvable.');
        }

        if (!req.session.cart) {
            req.session.cart = {
                items: [],
                totalPrice: 0,
            };
        }

        const cart = req.session.cart;

        const existingItem = cart.items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity, 10);
        } else {
            cart.items.push({
                productId: product._id,
                title: product.Titre,
                price: product.Prix,
                quantity: parseInt(quantity, 10),
                photo: product.Photo,
            });
        }

        cart.totalPrice += product.Prix * parseInt(quantity, 10);

        res.redirect('/cart');
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier :', error);
        res.status(500).send('Erreur lors de l\'ajout au panier.');
    }
};

// Afficher le panier
exports.viewCart = (req, res) => {
    const cart = req.session.cart || { items: [], totalPrice: 0 };
    res.render('cart', { cart });
};

// Supprimer un article du panier
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;

    const cart = req.session.cart;

    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex !== -1) {
            const removedItem = cart.items.splice(itemIndex, 1)[0];
            cart.totalPrice -= removedItem.price * removedItem.quantity;
        }
    }

    res.redirect('/cart');
};

// Vider le panier
exports.clearCart = (req, res) => {
    req.session.cart = { items: [], totalPrice: 0 };
    res.redirect('/cart');
};
