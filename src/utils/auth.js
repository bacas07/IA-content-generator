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

export const validateRole = (role, secret_key) => {

    if (role !== 'admin' && role !== 'developer' && role !== 'user') {
        return false;
    }

    if (role === 'admin' && secret_key === process.env.ADMIN_KEY ) {
        return true;
    }

    if (role === 'developer' && secret_key === process.env.DEVELOPER_KEY) {
        return true;
    }

    if (role === 'user') {
        return true;
    }
}

export const validateCategory = (category) => {
    const categories = [
        "Noticias y Actualidad",
        "Entretenimiento",
        "Tecnología",
        "Ciencia y Salud",
        "Negocios y Finanzas",
        "Viajes",
        "Moda y Estilo de Vida",
        "Educación",
        "Deportes",
        "Hogar y Jardinería",
    ]

    if (categories.includes(category)) {
        return true
    }

    return false
}

export const verifyApiKey = (req, res, next) => {
    try {
        const api_key = req.headers['x-api-key'];

        if (!api_key) {
            return res.status(401).json({ error: 'API key required' });
        }

        if (api_key !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        next();
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}