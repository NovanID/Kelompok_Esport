const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-rahasia';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Mengambil Bearer <token>
  
  if (!token) return res.status(403).json({ error: 'Token tidak tersedia, harap login' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Menyimpan info user (termasuk req.user.id) ke dalam request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
  }
};

module.exports = { verifyToken };
