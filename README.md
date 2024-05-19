# JobPortal

NodeJS project that implements a REST API for a LinkedIn-like job posting and application use-case.

### Features:
- NodeJS backend with endpoints for controlling user actions, job posts, companies and applications to the job posts. 
- Prisma schema connected to a MongoDB cloud database (Atlas)
- Express framework, Joi payload validation middleware, JWT Authentication Middleware + Role-based auth with cookie-parser for easier storage of the tokens.
- Multer middleware for file upload handling
- Swagger for documentation and endpoint tests

### Installation steps

1. Clone project locally
2. Cd into directory and run ```npm install``` to install dependencies
3. Create .env file with the properties:
```
DATABASE_URL="yourMongoDBConnectString"
JWT_SECRET=<RandomStringSecret>
JWT_REFRESH_SECRET=<AnotherRandomStringSecret>
```
4. Run ```npx prisma generate && npm prisma db push``` to generate the database
5. Run ```npm run dev``` to start up the project, navigate to \<URL>:3000/api-docs for the swagger documentation and further endpoint testing

### Database Schema
<p align="center">
<img src="/docs/database.png" height="1000"/>
</p>