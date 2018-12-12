import mongoose from 'mongoose';
import User from '../models/User';

exports.getUser = function(req, res) {
    let ObjectId = mongoose.Types.ObjectId;
    
    if (!ObjectId.isValid(req.params.id)) {
        return res.json({ user: null });
    } 

    User.findById(req.params.id)
        .then(user => res.json({ user: user }))
        .catch(error => res.status(500).json({error: error}));
};

exports.getRecentUsers = function () {
    return User.aggregate(
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
        ]).exec();
};