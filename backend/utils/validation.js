const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = new Error('Bad Request.')
    err.errors = errors;
    err.title = 'Bad Request.';
    err.status = 400;
    return next(err);
  }
  next();
};

module.exports = { handleValidationErrors };