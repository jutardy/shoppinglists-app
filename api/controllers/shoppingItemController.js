import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res, next) {
    ShoppingItem.find({ user_id: req.params.id }, function (err, item) {
        if (err) return next(err);
        res.json(item);
    },
    {
        collection: 'items'
    });
};

exports.createItem = function(req, res, next) {
    ShoppingItem.create(req.body, function (err, item) {
        if (err) return next(err);
        res.json(item);
    },
    {
        collection: 'items'
    });
};

exports.deleteItem = function(req, res, next) {
    ShoppingItem.findByIdAndRemove(req.params.id, req.body, function (err, item) {
        if (err) return next(err);
        res.json(item);
    },
    {
        collection: 'items'
    });
};