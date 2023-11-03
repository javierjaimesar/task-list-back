import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequire = async (req, res, next) => {
    try {
        const token = await req.cookies.token;

        console.log(token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized validateToken' });
        }

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            req.user = user;

            next();
        })
    } catch (error) {
        console.log(error);
    }

}