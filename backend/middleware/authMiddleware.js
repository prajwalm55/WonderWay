import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      id: decoded.id.toString(),
      role: decoded.role
    };

    console.log('Decoded Token:', decoded); 
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
  }
};

// Middleware to allow only the user themselves or admin
const verifyUser = (req, res, next) => {
  const userId = req.user?.id;
  const paramsId = req.params.id.toString();
  const role = req.user?.role;

  console.log({ paramsId, userId, role });

  if (paramsId === userId || role === 'admin') {
    next();
  } else {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }
};

// Middleware to allow only admin
const verifyAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'admin') {
    next();
  } else {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }
};

export { verifyToken, verifyUser, verifyAdmin };
