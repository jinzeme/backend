import jwt from 'jsonwebtoken';

// ✅ Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // ✅ Token format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user info to request
    next(); // ✅ Proceed to the next middleware or route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
