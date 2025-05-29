const port = 3000;
const express = require('express');
const methodOverride= require("method-override");
const path = require('path');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));
app.use(methodOverride('_method'));

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));


const mongoose = require('mongoose');
const connectionMongo = async () => {

    try {
        const connect = await mongoose.connect('mongodb+srv://chakib:system@cluster0.hqeua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Connection Mongo : ${connect.connection.host}`);
    }

    catch (error) {
       console.log('error: '+error.message)
    }
}
connectionMongo();

const routecart = require("./Routes/Carts");
const routeuser = require("./Routes/Users");
const routeproduct = require("./Routes/Products");

app.use("/cart",routecart)
app.use("/Users",routeuser)
app.use("/Products",routeproduct)


////////////////////////////////////////////////
const Product = require('./Modèles/Product');
const User = require('./Modèles/User');

app.get("/Home", async (req, res) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId);
        res.render("Home", { user });
    }
});

app.get("/mens", async (req, res) => {
    const products = await Product.find();
    res.render('mens',{products});
});
app.get("/womens", async (req, res) => {
    const products = await Product.find();
    res.render('womens',{products});
});
app.get("/accessories", async (req, res) => {
    const products = await Product.find();
    res.render('accessories',{products});
});
app.get("/detailsProduit/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('detailsProduit',{product});
});



//produit
app.get("/add_product", async (req, res) => {
    if (req.session.username) {
            res.render("add_product", { username: req.session.username });
     
    } else {
        res.redirect("/login");
    }
});

app.get('/your_products', async (req, res) => {
    try {
        if (!req.session.username) {
            return res.redirect('/login');
        }
        
        // Rechercher les produits de l'utilisateur
        const products = await Product.find({ Username: req.session.username });
        
        res.render('your_products', { products });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});




//login
app.get("/login", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.render("login", { errorMessage: '' });
    });
});
app.post("/login", async (req, res) => {
    try {
        const { Username,Password } = req.body;

        const user = await User.findOne({ Username });

        if (!user || user.Password != Password) {
            return res.status(401).render('login', { errorMessage: 'Invalid username or password' });
        }

        req.session.userId = user._id;
        req.session.username = req.body.Username;

        res.redirect('/Home');
    } catch (error) {
        res.render('login', { errorMessage: error.message });
    }
});
app.get("/register", (req, res) => {
    res.render("register", { errorMessage: '' });
});
app.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.redirect('/login');
    } catch (error) {
        res.render('register', { errorMessage: error.message });
    }
});



//paiement
app.get("/paiement", (req, res) => {
    res.render("paiement", { Message: '' });
});
app.post("/paiement", async (req, res) => {
    try {
        res.render('paiement', { Message: 'Paiement réussi ! Merci pour votre achat.' });

        res.redirect('/paiement');
    } catch (error) {
        res.render('paiement', { Message: error.message });
    }
});



app.listen(port, ()=>{
    console.log(`Node is running oc http://localhost:${port}`)
})



