import User from '../models/User';
import ShoppingItem from '../models/ShoppingItem';

exports.getItems = function(req, res, next) {
    ShoppingItem.countDocuments({})
        .then(number => {
            return res.json({ items: number });
        });
};
exports.getLists = function(req, res, next) {
    ShoppingItem.aggregate([{$group: { _id : '$user' }}])
        .then(number => {
            return res.json({ lists: number.length });
        });
};
exports.getUsers = function(req, res, next) {
    User.countDocuments({})
        .then(number => {
            return res.json({ users: number });
        });
};
exports.getLastUsers = function(req, res, next) {
    User.aggregate(
        [
            {$sort: {'created_at': -1}},
            {$limit: 5},
            {$lookup: {
                'from': 'items',
                'localField': '_id',
                'foreignField': 'user',
                'as': 'items'
            }},           
            {'$project': {
                '_id': 1,
                'username': 1,                
                'numItems': { $size: '$items' }
            }},        
        ])
        .then(response => {
            return res.json({ lastUsers: response });
        });
};
