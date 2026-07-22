const { body, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: result.array().map(err => ({
            field: err.param,
            message: err.msg
          }))
        });
      }
    }
    next();
  };
};

const loginValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

const registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['owner', 'manager', 'employee']).withMessage('Invalid role')
];

module.exports = { validate, loginValidation, registerValidation };
