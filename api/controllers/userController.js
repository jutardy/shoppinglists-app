import User from '../models/User';

exports.getUser = function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.json({username: user.username});
    },
    {
        collection: 'items'
    });
};