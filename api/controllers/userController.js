import User from '../models/User';
import mongoose from 'mongoose';

exports.getUser = function(req, res, next) {
    let ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(req.params.id)) {
        return res.json({ user: null });
    } 
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        return res.json({ user: user });
    },
    {
        collection: 'users'
    });
};