import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            },
            (err, token) => {
                if (err) console.log(reject);
                resolve(token)
            }
        )
    })
}

export default createAccessToken;