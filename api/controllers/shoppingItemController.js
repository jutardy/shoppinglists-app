import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res, next) {
    ShoppingItem.find({ user: req.params.id }).sort('-created_at')
        .then(items => res.json(items))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};

exports.createItem = function(req, res, next) {
    ShoppingItem.create(req.body)
        .then(item => res.json(item))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};

exports.updateItem = function(req, res, next) {
    let data = { 
        name: req.body.name, 
        updated_at: Date.now() 
    };

    ShoppingItem.findByIdAndUpdate(req.body._id, data)
        .then(item => res.json(item))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};

exports.deleteItem = function(req, res, next) {
    ShoppingItem.findByIdAndRemove(req.body.id)
        .then(item => res.json(item))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};

exports.deleteList = function(req, res, next) {
    ShoppingItem.deleteMany({ user: req.body.user })
        .then(item => res.json(item))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};
