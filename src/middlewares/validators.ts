import { Response, NextFunction, Request } from 'express'
import {
  userSchema,
  categorySchema,
  bookValidationSchema,
  authorSchema,
} from '../utils/validation/validationSchema'
import { StaticUserRepository } from '../data/repositories/static.repository'

/**
 * Validate create user request
 * @param req
 * @param res
 * @param next
 */
export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = userSchema.validate(req.body)

    if (error) {
      next(error)
    }
    const checkPersonalNumber = await StaticUserRepository.findByPersonal(
      req.body.personalNumber
    )

    if (checkPersonalNumber) {
      next(new Error('Personal number already exist'))
    }

    next()
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const validateCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = categorySchema.validate(req.body)

    if (error) {
      next(error)
    }
    const existingCategory = await StaticUserRepository.findByName(
      req.body.name
    )

    if (existingCategory) {
      next(new Error('category with name already exist'))
    }

    next()
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const validateCreateAuthor = async (
  req: Request,
  next: NextFunction
) => {
  try {
    const { error } = categorySchema.validate(req.body)

    if (error) {
      next(error)
    }
    const existingCategory = await StaticUserRepository.findByName(
      req.body.name
    )

    if (existingCategory) {
      next(new Error('category with name already exist'))
    }

    next()
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const validateCreateBook = async (req: Request, next: NextFunction) => {
  try {
    const { error } = bookValidationSchema.validate(req.body)

    if (error) {
      next(error)
    }
    const existingCategory =
      await StaticUserRepository.findByCategoryReferenceIdCategory(
        req.body.category
      )

    if (!existingCategory) {
      next(new Error('Category does not exist'))
    }

    const existingAuthor = await StaticUserRepository.findAuthorByReferenceId(
      req.body.author
    )

    if (!existingAuthor) {
      next(new Error('Author does not exist'))
    }

    next()
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}
