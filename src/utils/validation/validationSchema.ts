import Joi from 'joi'
export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  personalNumber: Joi.string().required(),
  password: Joi.string().required(),
  referenceId: Joi.string().optional(),
})

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().optional(),
})

export const authorSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  biography: Joi.string().optional(),
})

export const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.string().required(),
  isbn: Joi.string().required(),
  totalCopies: Joi.number().required(),
  availableCopies: Joi.number().required(),
  imageUrl: Joi.string().allow(null, ''),
  bookType: Joi.string().allow(null, ''),
  categoryId: Joi.string().allow(null, ''),
  publicationDate: Joi.date().allow(null, ''),
  language: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  pageCount: Joi.number().allow(null, ''),
  edition: Joi.string().allow(null, ''),
  tags: Joi.array().items(Joi.string()).allow(null, ''),
  acquiredDate: Joi.date().allow(null, ''),
  referenceId: Joi.string().allow(null, ''),
  price: Joi.number().allow(null, ''),
})
