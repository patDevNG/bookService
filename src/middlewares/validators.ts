import { Response, NextFunction, Request } from 'express'

import {
  userSchema,
  categorySchema,
  bookValidationSchema,
  authorSchema,
} from '../utils/validation/validationSchema'
import { StaticUserRepository } from '../data/repositories/static.repository'
import { ResponseHandler } from '../utils/errors/responseHandler'
import httpStatus from 'http-status'

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
      return ResponseHandler.errorResponse(
        res,
        error as unknown as string,
        httpStatus.BAD_REQUEST
      )
    }
    const checkPersonalNumber = await StaticUserRepository.findByPersonal(
      req.body.personalNumber
    )

    if (checkPersonalNumber) {
      return ResponseHandler.errorResponse(
        res,
        'User with personal number already exist',
        httpStatus.BAD_REQUEST
      )
    }

    next()
  } catch (error) {
    console.log('error', error)

    return ResponseHandler.errorResponse(
      res,
      error as string,
      httpStatus.BAD_REQUEST
    )
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
      return ResponseHandler.errorResponse(
        res,
        error as unknown as string,
        httpStatus.BAD_REQUEST
      )
    }
    const existingCategory = await StaticUserRepository.findByName(
      req.body.name
    )

    if (existingCategory) {
      return ResponseHandler.errorResponse(
        res,
        'category with name already exist',
        httpStatus.BAD_REQUEST
      )
    }

    next()
  } catch (error) {
    return ResponseHandler.errorResponse(
      res,
      error as string,
      httpStatus.BAD_REQUEST
    )
  }
}

export const validateCreateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = authorSchema.validate(req.body)

    if (error) {
      return ResponseHandler.errorResponse(
        res,
        error as unknown as string,
        httpStatus.BAD_REQUEST
      )
    }
    const existingCategory = await StaticUserRepository.findByName(
      req.body.name
    )

    if (existingCategory) {
      return ResponseHandler.errorResponse(
        res,
        'author with name already exist',
        httpStatus.BAD_REQUEST
      )
    }

    next()
  } catch (error) {
    return ResponseHandler.errorResponse(
      res,
      error as string,
      httpStatus.BAD_REQUEST
    )
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const validateCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = bookValidationSchema.validate(req.body)

    if (error) {
      return ResponseHandler.errorResponse(
        res,
        error as unknown as string,
        httpStatus.BAD_REQUEST
      )
    }
    const existingCategory =
      await StaticUserRepository.findByCategoryReferenceIdCategory(
        req.body.categoryId
      )

    if (!existingCategory) {
      return ResponseHandler.errorResponse(
        res,
        'Category does not exist',
        httpStatus.BAD_REQUEST
      )
    }

    const existingAuthor = await StaticUserRepository.findAuthorByReferenceId(
      req.body.authorId
    )

    if (!existingAuthor) {
      return ResponseHandler.errorResponse(
        res,
        'Author does not exist',
        httpStatus.BAD_REQUEST
      )
    }
    req.body.categoryId = existingCategory._id
    req.body.authorId = existingAuthor._id
    next()
  } catch (error) {
    console.log('error', error)

    return ResponseHandler.errorResponse(
      res,
      error as string,
      httpStatus.BAD_REQUEST
    )
  }
}
