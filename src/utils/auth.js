import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generar un token JWT
export const generateToken = (user) => {
    try {
        if (!process.env.JWT_TOKEN_SECRET) {
            throw new Error("JWT_TOKEN_SECRET is not defined in environment variables");
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return jsonwebtoken.sign(
            payload,
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Usa el tiempo definido en env o '1h' por defecto
        );
    } catch (e) {
        console.error("Error generating token:", e.message);
        throw new Error("Failed to generate token"); // Lanzar error en lugar de fallar silenciosamente
    }
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        if (!process.env.JWT_TOKEN_SECRET) {
            throw new Error("JWT_TOKEN_SECRET is not defined in environment variables");
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;

        next();
    } catch (e) {
        console.error("Token verification error:", e.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
