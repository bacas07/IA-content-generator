import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

export const permit = (...allowedRoles) => {
    try {
        return (req, res, next) => {
            const { role } = req.user;
            console.log(role);
            console.log(allowedRoles);

            if (allowedRoles.includes(role)) {
                next();
            } else {
                res.status(403).json({ error: 'Forbidden: You do not have the necessary permissions' });
            }

        };
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const validateRole = (role, secrect_key) => {
    try {

        if (role == 'admin' && secrect_key != process.env.ADMIN_KEY) {
            return res.status(401).json({ error: 'Invalid admin secrect key' });
        }
    
        if (role == 'developer' && secrect_key != process.env.DEVELOPER_KEY) {
            return res.status(401).json({ error: 'Invalid developer secret key' });
        }
    
        if (role != 'admin' || role != 'developer') {
            return res.status(401).json({ error: 'Invalid role' });
        }

    } catch (e) {
        return res.status(500).json({ error: 'Error validating role' });
    }

    
}