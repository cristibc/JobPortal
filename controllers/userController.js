const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const auth = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

async function register(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(200).json(newUser);
    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(400)
        .json({ message: "User already exists with given username or email" });
    }
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = jwt.sign ({ user }, process.env.JWT_SECRET, { expiresIn: '1h'});
    const refreshToken = jwt.sign(
      { user },
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '1d'}
    );

    return res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
      })
      .header("Authorization", accessToken)
      .status(200)
      .json({ message: "Logged in successfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  try {
    const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { user: data.user },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.header("Authorization", accessToken).send(data.user);
  } catch (error) {
    return res.status(400).json({ message: "Invalid refresh token provided." });
  }
}

async function logout(req, res) {
  res.clearCookie("refresh_token").header("Authorization", "").status(200).json({ message: "Logged out successfully" });
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
