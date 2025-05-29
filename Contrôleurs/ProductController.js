const Product = require('../Modèles/Product')

exports.Create = async (req, res) => {
    try {
        req.body.Photo = req.file.filename;
        await Product.create(req.body);

        res.redirect('/add_product');
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readAll = async (req, res) => {
    try {
        const products = await Product.find();

        res.render('Products',{products});
    }
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        res.render('Product',{product});
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};



exports.Delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id,req.body);
        res.redirect('/Home');
      
    } 
    catch (error) {
        res.status(404).render('Error',{ message:error.message });
    }
};