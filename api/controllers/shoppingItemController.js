import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res, next) {
    ShoppingItem.find({ user: req.params.id })
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

exports.deleteItem = function(req, res, next) {
    ShoppingItem.findByIdAndRemove(req.body.id)
        .then(item => res.json(item))
        .catch(error => {    
            return res.status(500).json({error: error});
        });
};