import jwt from 'jsonwebtoken';

export function createJWToken(user, extendedToken = false) {
    const duration = extendedToken ? process.env.TOKEN_EXTENDED_DURATION : process.env.TOKEN_DURATION;
    let token = jwt.sign(
        { email: user.email, id: user._id }, 
        process.env.APP_SECRET, 
        { expiresIn: duration }
    );
    return token;
}

export function verifyJWTToken(req, res, next) {
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        jwt.verify(token, process.env.APP_SECRET, function(err) {
            if (err) {
                return res.status(401).send({ code: 35, message: 'Unauthenticated.' });
            } else {
                next();                
            }
        });        
    } else {
        next();
    }
}

export default {
    verifyJWTToken,
    createJWToken
};