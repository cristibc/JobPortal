const Joi = require("joi");
const Schemas = require("../schemas");

const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    if (!Schemas[schema]) {
      return res.status(400).json({ message: `'${schema}' schema not found.` });
    }

    try {
      const value = await Schemas[schema].validateAsync(req.body, { abortEarly: false });

      req.body = value;

      next();
    } catch (err) {
      if (err.isJoi) {
        return res.status(422).json({ errors: err.details.map(detail => detail.message) });
      }

      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
};

module.exports = validationMiddleware;
