const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const companyRoute = require("./routes/companyRoute")
const userRoute = require("./routes/userRoute")
const jobPostRoute = require("./routes/jobPostRoute")
const jwt = require('jsonwebtoken');
const auth = require('./middleware/authenticate');
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());


app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

app.use("/api/", userRoute)
app.use("/api/companies", companyRoute)
app.use("/api/jobPost", jobPostRoute)

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