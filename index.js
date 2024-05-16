const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const auth = require('./middleware/authenticate');
const cookieParser = require("cookie-parser");
const Joi = require('joi').extend(require('@joi/date'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

// Routes
const companyRoute = require("./routes/companyRoute")
const userRoute = require("./routes/userRoute")
const jobPostRoute = require("./routes/jobPostRoute")
const applicationRoute = require("./routes/applicationRoute");

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

app.use("/api/", userRoute)
app.use("/api/companies", companyRoute)
app.use("/api/jobPosts", jobPostRoute)
app.use("/api/applications", applicationRoute)

app.get('/', auth.authenticateToken, (req, res) => {
    res.send("Hello from Node API updateds");
});

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })