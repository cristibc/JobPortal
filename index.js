const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const auth = require('./middleware/authenticate');
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Your API Description",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

// Routes
const companyRoute = require("./routes/companyRoute")
const userRoute = require("./routes/userRoute")
const jobPostRoute = require("./routes/jobPostRoute")
const applicationRoute = require("./routes/applicationRoute");

// Swagger

setupSwagger(app); // Setup Swagger documentation


app.listen(3000, () => {
    console.log("Server is running on port 3000")
});

app.use("/api/", userRoute)
app.use("/api/companies", companyRoute)
app.use("/api/jobPosts", jobPostRoute)
app.use("/api/applications", applicationRoute)

app.get('/', auth.authenticateToken('USER'), (req, res) => {
    res.status(200).json({ message: req.user});
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