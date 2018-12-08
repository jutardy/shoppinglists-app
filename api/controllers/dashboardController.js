import User from '../models/User';
import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res) {
    ShoppingItem.countDocuments({})
        .then(number => res.json({ items: number }))
        .catch(error => res.status(500).json({error: error}));
};
exports.getLists = function(req, res) {
    ShoppingItem.aggregate(
        [
            { $group: { _id : '$user' } },
            { $count : 'numLists' }
        ])
        .then(result => res.json({ lists: result[0].numLists }))
        .catch(error => res.status(500).json({error: error}));
};
exports.getUsers = function(req, res) {
    User.countDocuments({})
        .then(number => res.json({ users: number }))
        .catch(error => res.status(500).json({error: error}));
};
exports.getLastUsers = function(req, res) {
    User.aggregate(
        [
            { $sort: { 'created_at': -1 } },
            { $limit: 5 },
            { $lookup: {
                'from': 'items',
                'localField': '_id',
                'foreignField': 'user',
                'as': 'items'
            } },           
            { '$project': {
                '_id': 1,
                'username': 1,                
                'numItems': { $size: '$items' }
            } },        
        ])
        .then(result => res.json({ lastUsers: result }))
        .catch(error => res.status(500).json({error: error}));
};
