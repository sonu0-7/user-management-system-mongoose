const Joi = require('joi');

const productJoiSchema = Joi.object({
  productTitle: Joi.string().min(3).max(30).required(),
  productName: Joi.string().alphanum().required(),
});

module.exports = {
  productJoiSchema,
};