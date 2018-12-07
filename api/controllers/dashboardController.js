import User from '../models/User';
import ShoppingItem from '../models/ShoppingItem';




exports.getItems = function(req, res, next) {
    return res.json({ items: 237 });
};
exports.getLists = function(req, res, next) {
    return res.json({ lists: 1224442 });
};
exports.getUsers = function(req, res, next) {
    return res.json({ users: 15422 });
};
exports.getLastUsers = function(req, res, next) {
    const data = [
        { id: '5c07bf0f7f4415372cbc8e33', username: 'Sebas', numItems: 17 },
        { id: '5c0516fd57a51e4d784a6c72', username: 'Rafa', numItems: 5 },
        { id: '5c05178d6d15344570df37fe', username: 'Pablo', numItems: 0 },
        { id: '5c068d5981284e22443a6adc', username: 'Mario', numItems: 12 },
        { id: '5c03b8275d4dd53ae0e20128', username: 'Sandra', numItems: 8 },
    ];
    return res.json({ lastUsers: data });
};



exports.getHomeData = function(req, res, next) {

    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        return res.json({ user: user });
    },
    {
        collection: 'users'
    });
};