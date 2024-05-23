const Joi = require("joi").extend(require("@joi/date"));

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),

  role: Joi.string().valid("USER", "COMPANY"),

  password: Joi.string().min(3).max(72).required(),

  // 2024-05-12T22:15:46.506+00:00
  createdAt: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),

  email: Joi.string().email(),

  role: Joi.string().valid("GUEST", "USER", "COMPANY", "ADMIN"),

  password: Joi.string().min(3).max(72),

  // 2024-05-12T22:15:46.506+00:00
  createdAt: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(3).max(72).required(),
});

const companySchema = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).required(),

  description: Joi.string().required().min(1).max(250).required(),

  // 2024-05-12T22:15:46.506+00:00
  createdAt: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
});

const createApplicationSchema = Joi.object({
  jobPostId: Joi.string().required(),
  userId: Joi.string().required(),
});

const applyAsUserSchema = Joi.object({
  jobPostId: Joi.string().required(),
});

const updateApplicationSchema = Joi.object({
  jobPostId: Joi.string().required(),
  userId: Joi.string().required(),
});

const acceptApplicationsForJobPostSchema = Joi.object({
  acceptedUsers: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string())
    .required(),
  jobPostId: Joi.string().required(),
});

const getApplicationsByPageAndCountSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  countPerPage: Joi.number().integer().min(1).required(),
});

const createJobPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number().required(),
  experience: Joi.string().required(),
  type: Joi.string().required(),
  companyName: Joi.string().required(),
});

const createOwnJobPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number().required(),
  experience: Joi.string()
    .required()
    .valid("Internship", "Junior", "Mid", "Senior"),
  type: Joi.string().required().valid("Remote", "Hybrid", "OnSite"),
  companyName: Joi.string().optional(),
});

const updateJobPostSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  salary: Joi.number().optional(),
  experience: Joi.string()
    .optional()
    .valid("Internship", "Junior", "Mid", "Senior"),
  type: Joi.string().optional().valid("Remote", "Hybrid", "OnSite"),
  company: Joi.string().optional(),
  status: Joi.string().optional().valid("Closed", "Open"),
});

const jobPostMatchingSchema = Joi.object({
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  company: Joi.string().optional(),
  experience: Joi.string()
    .optional()
    .valid("Internship", "Junior", "Mid", "Senior"),
  type: Joi.string().optional().valid("Remote", "Hybrid", "OnSite"),
  status: Joi.string().optional().valid("Closed", "Open"),
});

const jobPostMatchingMinimumSalarySchema = Joi.object({
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  company: Joi.string().optional(),
  experience: Joi.string()
    .optional()
    .valid("Internship", "Junior", "Mid", "Senior"),
  type: Joi.string().optional().valid("Remote", "Hybrid", "OnSite"),
  minimumSalary: Joi.number().optional(),
  status: Joi.string().optional().valid("Closed", "Open"),
});

const sortJobPostsSchema = Joi.object({
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  company: Joi.string().optional(),
  experience: Joi.string()
    .optional()
    .valid("Internship", "Junior", "Mid", "Senior"),
  type: Joi.string().optional().valid("Remote", "Hybrid", "OnSite"),
  minimumSalary: Joi.number().optional(),
  status: Joi.string().optional().valid("Closed", "Open"),
  order: Joi.string().valid("asc", "desc").required(),
});

module.exports = {
  register: registerSchema,
  login: loginSchema,
  addCompany: companySchema,
  updateUser: updateUserSchema,
  createApplication: createApplicationSchema,
  applyAsUser: applyAsUserSchema,
  updateApplication: updateApplicationSchema,
  acceptApplicationsForJobPost: acceptApplicationsForJobPostSchema,
  getApplicationsByPageAndCount: getApplicationsByPageAndCountSchema,
  createJobPost: createJobPostSchema,
  createOwnJobPost: createOwnJobPostSchema,
  updateJobPost: updateJobPostSchema,
  getJobPostMatching: jobPostMatchingSchema,
  getJobPostMatchingMinimumSalary: jobPostMatchingMinimumSalarySchema,
  getSortJobPosts: sortJobPostsSchema,
};
