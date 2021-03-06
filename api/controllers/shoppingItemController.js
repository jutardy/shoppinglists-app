import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res) {
    let modelFields = Object.keys(ShoppingItem.schema.paths);    
    const sortField = req.query.field && modelFields.includes(req.query.field) ? req.query.field : 'created_at';
    const sortOrder = req.query.order ? req.query.order : -1;
    const sortOption = {[sortField]: sortOrder};

    ShoppingItem.find({ user: req.params.id }).sort(sortOption)
        .then(items => res.json(items))
        .catch(error => res.status(500).json({error: error}));
};

exports.createItem = function(req, res) {
    ShoppingItem.create(req.body)
        .then(item => res.json(item))
        .catch(error => res.status(500).json({error: error}));
};

exports.updateItem = function(req, res) {
    let data = { 
        name: req.body.name, 
        updated_at: Date.now() 
    };

    ShoppingItem.findByIdAndUpdate(req.body._id, data)
        .then(item => res.json(item))
        .catch(error => res.status(500).json({error: error}));
};

exports.deleteItem = function(req, res) {
    ShoppingItem.findByIdAndRemove(req.body.id)
        .then(item => res.json(item))
        .catch(error => res.status(500).json({error: error}));
};

exports.deleteList = function(req, res) {
    ShoppingItem.deleteMany({ user: req.body.user })
        .then(item => res.json(item))
        .catch(error => res.status(500).json({error: error}));
};
