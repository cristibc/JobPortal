# JobPortal

NodeJS project that implements a REST API for a LinkedIn-like job posting and application use-case.

### Features:
- Prisma schema connected to a MongoDB cloud database (Atlas)
- Express framework, Joi payload validation middleware, JWT Authentication Middleware + Role-based auth with cookie-parser for easier storage of the tokens.
- Multer middleware for file upload handling
- Swagger for documentation and endpoint tests

### Database Schema
<p align="center">
<img src="/docs/database.png" height="300"/>
</p>