const User = require('../Modèles/User')

exports.Create = async (req, res) => {
    try {
        await User.create(req.body);

        res.redirect('/Users');
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readAll = async (req, res) => {
    try {
        const users = await User.find();

        res.render('Users',{users});
    }
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        res.render('User',{user});
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.Update = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id,req.body);
        res.redirect('/Users');
      
    } 
    catch (error) {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.Delete = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id,req.body);
        res.redirect('/Users');
      
    } 
    catch (error) {
        res.status(404).render('Error',{ message:error.message });
    }
};