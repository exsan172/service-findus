import jwt from 'jsonwebtoken'
import { response } from '../config'

export const verifyJwt = (req, res, next) => {
    let tokenHeader = req.headers['token'];

    if (tokenHeader.split(' ')[0] !== 'Bearer') {
        return response(res, 500, "Incorrect token format")
    }

    let token = tokenHeader.split(' ')[1];

    if (!token) {
        return response(res, 403, "No token provided")
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return response(res, 500, err)
        }

        req.user = decoded;
        next();
    });
}