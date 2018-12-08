import User from '../models/User';
import mongoose from 'mongoose';

exports.getUser = function(req, res) {
    let ObjectId = mongoose.Types.ObjectId;
    
    if (!ObjectId.isValid(req.params.id)) {
        return res.json({ user: null });
    } 

    User.findById(req.params.id)
        .then(user => res.json({ user: user }))
        .catch(error => res.status(500).json({error: error}));
};