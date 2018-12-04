import bcrypt from 'bcryptjs';
import User from '../models/User';
import { createJWToken } from '../libs/token';

exports.register = function(req, res) {
    let data = req.body || {};
    data.password = bcrypt.hashSync(data.password, 8);

    User.create(data)
        .then(user => res.json(user))
        .catch(error => {
            if (error && error.code === 11000 && error.index === 0) {
                return res.status(409).json({ error: {
                    code: error.code,
                    field: 'email',
                    message: 'This email already exists in our database.' 
                }});
            }            
            return res.status(500).json({error: error});
        });
};

exports.login = function(req, res) {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: {
                    code: 30,
                    message: 'This email doesn\'t exist in our database.'
                }});
            }
            
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return res.status(401).json({ error: {
                        code: 31,
                        message: 'Unauthorized Access.'
                    }});
                }
                if (result) {
                    const token = createJWToken(user, req.body.extendToken);

                    return res.json({ user: user, token: token });
                }
                return res.status(401).json({ error: {
                    code: 32,
                    message: 'The provided password is incorrect.'
                }});
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
