const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const auth = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const fs = require('fs').promises;

const saltRounds = 10;

async function register(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      },
    });
    res.status(200).json(newUser);
    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(400)
        .json({ message: "User already exists with given username or email" });
    } else {
      res.status(500).json({ message: error.message });
    }
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

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });

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
    const accessToken = jwt.sign({ user: data.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.header("Authorization", accessToken).send(data.user);
  } catch (error) {
    return res.status(400).json({ message: "Invalid refresh token provided." });
  }
}

async function logout(req, res) {
  res
    .clearCookie("refresh_token")
    .header("Authorization", "")
    .status(200)
    .json({ message: "Logged out successfully" });
}

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        image: req.body.image || undefined,
        cv: req.body.cv || undefined,
        role: req.body.role,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  } else {
    hashedPassword = undefined;
  }
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      data: {
        username: req.body.username || undefined,
        email: req.body.email || undefined,
        password: hashedPassword || undefined,
        role: req.body.role || undefined,
      },
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addImageOrCv = async (req, res) => {
  try {
    imagePath = undefined;
    cvPath = undefined;

    if (req.files['image']) {
     imagePath = req.files['image'][0].path;
    }
    if (req.files['cv']) {
     cvPath = req.files['cv'][0].path;
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      }
    })

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (imagePath && checkUser.image){
      await deleteFile(checkUser.image)
    }

    if (cvPath && checkUser.cv){
      await deleteFile(checkUser.cv)
    }

    const user = await prisma.user.update({
      data: {
        image: imagePath || undefined,
        cv: cvPath || undefined,
      },
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  addImageOrCv,
};
