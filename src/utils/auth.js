import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

export const generateToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        return jsonwebtoken.sign(
            payload,
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
    } catch (e) {
        console.log('Error: ', e);
    }
}

export const verifyToken =  (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Token required' });
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}