const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refresh_token']
  
  if (accessToken == null) return res.sendStatus(401);
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: "Access Denied! Access and refresh tokens not provided"})
    }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = data.user;
    return next();
  } catch (error) {
    if (!refreshToken) {
        return res.sendStatus(401).json({ message: "Access denied! Refresh token was not provided"});
    }

    try {
        const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({ user: data.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('refresh_token', refreshToken).header('Authorization', accessToken).send(data.user);
    } catch (error) {
        return res.status(400).json({ message: "Invalid token provided"});
    }
  }
}

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { authenticateToken, generateToken };
