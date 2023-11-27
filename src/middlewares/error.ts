/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction, Request } from 'express';
import httpStatus from 'http-status';
import logger from '../utils/logger';

/**
 * Error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Check if the error is a MongoServerError with code E11000 (duplicate key)
  if (err.code === 'MongoServerError' || err.code === 11000) {

    const duplicateKeyError = new CustomError(
      'Duplicate key error: A entity with this email already exists.',
      httpStatus.BAD_REQUEST
    );

    return res.status(duplicateKeyError.status).json({
      success: false,
      error: {
        statusCode: duplicateKeyError.status,
        message: duplicateKeyError.message,
      },
    });
  }

  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    success: false,
    error: {
      statusCode,
      message: err.message || httpStatus[err.status],
      errors: err.errors,
    },
  };

  const isProduction = process.env.ENVIRONMENT === 'production';

  if (!isProduction) {
    logger.error(err.message);
  }
  return res.status(statusCode).json(response);
};


/**
 * Catch 404 and forward to error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const notFoundHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return errorHandler(err, req, res, next);
};


export class CustomError {
  message!: string;

  status!: number;

  additionalInfo!: any;

  constructor(message: string, status = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class NotFoundError extends CustomError {
  status!: number;

  message!: string;

  additionalInfo!: any;

  constructor(
    message = 'Item not found',
    status = httpStatus.NOT_FOUND,
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class BadRequestError extends CustomError {
  status!: number;

  message!: string;

  additionalInfo!: any;

  constructor(
    message = 'Bad Request',
    status = httpStatus.BAD_REQUEST,
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class UnAuthorizedError extends CustomError {
  status!: number;

  message!: string;

  additionalInfo!: any;

  constructor(
    message = 'Access Denied',
    status = httpStatus.UNAUTHORIZED,
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class InternalServerError extends CustomError {
  status!: number;

  message!: string;

  additionalInfo!: any;

  constructor(
    message = 'Internal Server Error',
    status = httpStatus.INTERNAL_SERVER_ERROR,
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}
