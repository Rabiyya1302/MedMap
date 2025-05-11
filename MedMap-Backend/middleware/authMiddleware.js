// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token)
    return res.status(401).json({ message: 'Access token missing.' });

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Role-based check
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Unauthorized role.' });
    }
    next();
  };
};
