import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';
import UserController from '../controllers/UserController';

exports.getItems = function(req, res) {
    ShoppingItem.countDocuments({})
        .then(number => res.json({ items: number }))
        .catch(error => res.status(500).json({error: error}));
};
exports.getLists = function(req, res) {
    ShoppingItem.countDocuments({}, function(err, docs) {
        if (err) return res.status(500).json({error: err});
        if (docs === 0) return res.json({ lists: 0 });
        
        ShoppingItem.aggregate(
            [
                { $group: { _id : '$user' } },
                { $count : 'numLists' }
            ])
            .then(result => res.json({ lists: result[0].numLists }))
            .catch(error => res.status(500).json({error: error})); 
    });
};
exports.getUsers = function(req, res) {
    User.countDocuments({})
        .then(number => res.json({ users: number }))
        .catch(error => res.status(500).json({error: error}));
};
exports.getLastUsers = function(req, res) {
    UserController.getRecentUsers()
        .then(result => res.json({ lastUsers: result }))
        .catch(error => res.status(500).json({error: error}));
};
