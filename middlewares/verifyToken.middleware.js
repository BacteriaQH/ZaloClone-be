import { Jwt } from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // console.log(token);
        Jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token is not valid!');
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json('You are not authenticated');
    }
};

export default verifyToken;
